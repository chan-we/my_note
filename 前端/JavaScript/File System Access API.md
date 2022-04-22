<https://www.mifengjc.com/api/File_System_Access_API.html>

[File and Directory Entries API](https://developer.mozilla.org/zh-CN/docs/Web/API/File_and_Directory_Entries_API)

<https://web.dev/file-system-access/>

# 概念

此 API 允许与用户本地设备或用户可访问的网络文件系统上的文件进行交互。此 API 的核心功能包括读取文件、写入或保存文件以及访问目录结构。

大多数与文件和目录的交互是通过句柄完成的。从父类句柄 `FileSystemHandle` 继承了两个子类：[`FileSystemFileHandle`](https://www.mifengjc.com/api/FileSystemFileHandle.html) 和 [`FileSystemDirectoryHandle`](https://www.mifengjc.com/api/FileSystemDirectoryHandle.html)，分别用于文件和目录。

这些句柄表示用户系统上的文件或目录。您必须首先通过向用户显示文件或目录选择器来访问它们。可以通过 `window.showOpenFilePicker` 和 `window.showDirectoryPicker` 来显示文件或目录选择器，然后用户选择一个文件或目录。一旦选择完成，将返回一个句柄。您还可以通过 `HTML Drag and Drop API` 的 `DataTransferItem.getAsFileSystemHandle()` 方法访问文件句柄。

句柄提供了相应的功能，根据选择的是文件还是目录而有一些差异（有关具体详细信息，请参阅 [接口](https://www.mifengjc.com/api/File_System_Access_API.html#接口) 部分）。然后，您可以访问所选目录的文件数据或信息（包括子目录）。

还有 “保存” 功能，使用的是 `FilesystemWritableFileStream` 接口。一旦您要保存的数据格式为 [`Blob`](https://www.mifengjc.com/api/Blob.html), [`USVString`](https://www.mifengjc.com/api/USVString.html) 或 `buffer`，您可以打开流并将数据保存到文件中。可以保存现有文件或新文件。

这个 API 开辟了网络一直缺乏的潜在功能。尽管如此，在设计 API 时，安全性一直是最重要的问题，除非用户特别允许，否则不允许访问文件 / 目录数据。

# 访问文件

```js
async function getFile() {
  // 打开文件选择器
  let handle = await window.showOpenFilePicker();
  if (!handle) {
    // 用户取消，或无法打开文件。
    return;
  }

}
```

# 访问文件夹

```js
async function getFile() {
  // 打开文件夹选择器
  let handle = await window.showDirectoryPicker();
  if (!handle) {
    // 用户取消，或无法打开文件。
    return;
  }
    
  console.log(handle.kind);	// "directory"
  console.log(handle.name);	// 文件夹名（并非完整路径）
}
```

## 读取文件夹中的子项

使用`FileSystemDirectoryHandle.values()`获取文件夹中的子项，返回的是一个新的异步迭代器，包含`FileSystemFileHandle`和`FileSystemDirectoryHandle`。因为是异步迭代器，所以需要使用`for await...of`来遍历

```js
const dirHandle = await window.showDirectoryPicker();
for await (const entry of dirHandle.values()) {
    console.log(entry);
}
```

结果：

![image-20220422153714494](http://picgo.chanwe.top/202204221537586.png)
