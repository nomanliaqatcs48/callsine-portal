import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { devLog } from "../../helpers/logs";
import config from "../../config";
import { loadString } from "../../utils/storage";
import React, { useState } from "react";
import ErrorMessage from "../extended/ErrorMessage";

const PeopleFileUpload = (props: any) => {
  const [errorMsg, setErrorMsg] = useState<any>("");
  const {
    onChange,
    onRemove,
    instance,
    refresh,
    deleteFileAfterRemove = false,
  } = props;

  // specify upload params and url for your files
  const getUploadParams = async ({ file, meta }: any) => {
    devLog("getUploadParams() file", file);
    devLog("getUploadParams() meta", meta);
    let formData = new FormData();
    let _token = await loadString("token");
    formData.append("file", file);

    /*try {
      // setLoading(true);
      let _token = await loadString("token");
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append("file", file);

      xhr.open("POST", `https://api.callsine.com/api/bulk-import/`, true);
      xhr.setRequestHeader("Authorization", `Bearer ${_token}`);
      xhr.onload = (e) => {
        // console.log('e', xhr);
        if (xhr.status === 200 || xhr.status === 201) {
          let response = JSON.parse(xhr.responseText);
          if (response?.json_response?.total_matched_contacts > 0) {
            // setErrorMsg('');

            // csv response
            if (response?.csv_response?.contacts !== "") {
              //
            }
          } else {
            // setErrorMsg('No contacts found.');
            // setLoading(false);
          }
        } else {
          // setErrorMsg('Invalid. Should be linkedin url.');
          // setLoading(false);
        }
      };
      xhr.onerror = (e) => {
        devLog("e", e);
        devLog("onerror", xhr.statusText);
        // setErrorMsg('No contacts found.');
        // setLoading(false);
      };
      xhr.send(formData);
    } catch (e: any) {
      devLogError(e?.response);
      // setError('username', {
      //   type: 'manual',
      //   message: 'Incorrect username or password.',
      // });
      // setLoading(false);
    }*/

    // return { url: "https://httpbin.org/post" };
    return {
      url: config.service.BASE_URL + "/api/bulk-import/",
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      // url: string
      // method?: MethodValue
      // body?: string | FormData | ArrayBuffer | Blob | File | URLSearchParams
      // fields?: { [name: string]: string | Blob }
      // headers?: { [name: string]: string }
      // meta?: { [name: string]: any }
    };
    /*return {
      url:
        process.env.REACT_APP_BASE_URL +
        `/api/contact-imports/${instance.id}/file/`,
    };*/
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    devLog("handleChangeStatus()", status, meta, file);
    setErrorMsg("");
    if (status === "done") refresh();
    if (deleteFileAfterRemove) {
      if (status === "removed") {
        onRemove();
      }
    }
    if (status === "error_upload") {
      setErrorMsg(
        "Upload failed. Please make sure your CSV file uses the correct template"
      );
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any, allFiles: any) => {
    devLog("handleSubmit() files", files);
  };

  return (
    <>
      <Dropzone
        //@ts-ignore
        getUploadParams={getUploadParams}
        multiple={false}
        autoUpload={true}
        canCancel={true}
        maxFiles={1}
        SubmitButtonComponent={() => null}
        inputContent={
          <div className="tw-text-sm tw-text-[#778da9] tw-border-[1px] tw-border-dashed">
            Drop your CSV file here
          </div>
        }
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept=".csv"
      />

      <ErrorMessage>{errorMsg}</ErrorMessage>
    </>
  );
};

export default PeopleFileUpload;
