  // worker.js
  import SparkMD5 from 'spark-md5'
  // 接收文件对象及切片大小
  const files =[]
  let fileExt = '.zip'
  let fileName = 'temp'
  self.onmessage = function (event){
    const { file,  chunkSize } = event.data; // 从主线程接收到的数据
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      chunks = Math.ceil(file.size /  chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of');
      fileExt = file.name.substr(file.name.lastIndexOf('.')).toLowerCase()
      fileName = file.name.substr(0,file.name.lastIndexOf('.')).toLowerCase()
      const chunk = e.target.result;
      
      spark.append(chunk);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        let fileHash = spark.end();
        console.info('finished computed hash', fileHash,JSON.stringify(fileReader));
        // 此处为重点，计算完成后，仍然通过postMessage通知主线程
        postMessage({ fileHash,files })
      }
    };

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.');
    };

    function loadNext() {
      let start = currentChunk *  chunkSize,
        end = ((start +  chunkSize) >= file.size) ? file.size : start +  chunkSize;
      let chunk = blobSlice.call(file, start, end);
      files.push({file:chunk,name:`${fileName}-${currentChunk + 1}${fileExt}`})
      fileReader.readAsArrayBuffer(chunk);
    }

    loadNext();
  }
