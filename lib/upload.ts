import { Octokit } from "@octokit/core";
import { MediaType } from "braft-editor";

export const editorUploadFn: MediaType["uploadFn"] = ({
  file,
  success,
  error,
}) => {
  uploadFetch(file, file.name)
    .then(({ content: { download_url, name } }) => {
      success({
        url: download_url,
        meta: {
          id: name,
          title: name,
          alt: name,
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: "", // 指定视频播放器的封面
        },
      });
    })
    .catch((err) => {
      error({
        msg: "上传失败",
      });
    });
};

const uploadFetch = async (file: File, path: string) => {
  const content = await getBase64(file);

  return await fetch("/api/upload", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      path: file.name + Date.now(),
    }),
  }).then((res) => res.json());
};

function getBase64(file: File) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
