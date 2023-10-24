import { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import config from "../../config";
import { devLog } from "../../helpers/logs";
import { load, loadString } from "../../utils/storage";
import ErrorMessage from "../extended/ErrorMessage";

const AddUserDataUpload = (props: any) => {
  const [errorMsg, setErrorMsg] = useState<any>("");
  const {
    onChange,
    onRemove,
    instance = null,
    refresh,
    deleteFileAfterRemove = false,
    onboarding = false,
  } = props;

  // specify upload params and url for your files
  const getUploadParams = async ({ file, meta }: any) => {
    devLog(() => {
      console.log("getUploadParams() file", file);
      console.log("getUploadParams() meta", meta);
    });
    let formData = new FormData();
    let _token = await loadString("token");
    let _profile: any = await load("profile");
    formData.append("file", file);
    formData.append("user", _profile?.id);

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
				console.error("e", e);
				console.log("onerror", xhr.statusText);
				// setErrorMsg('No contacts found.');
				// setLoading(false);
			};
			xhr.send(formData);
		} catch (e: any) {
			console.error(e?.response);
			// setError('username', {
			//   type: 'manual',
			//   message: 'Incorrect username or password.',
			// });
			// setLoading(false);
		}*/

    // return { url: "https://httpbin.org/post" };
    return {
      url: config.service.BASE_URL + "/api/user-data/",
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
    devLog(() => {
      console.log("handleChangeStatus()", status, meta, file);
    });
    setErrorMsg("");
    if (status === "done") refresh();
    if (deleteFileAfterRemove) {
      if (status === "removed") {
        onRemove();
      }
    }
    if (status === "error_upload") {
      setErrorMsg(
        "Upload failed. Please make sure your file uses the correct template"
      );
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any, allFiles: any) => {
    devLog(() => {
      console.log("handleSubmit() files", files);
    });
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
          onboarding ? (
            <div className="tw-text-sm tw-text-white tw-border-[1px] tw-border-dashed">
              Drop your file here
            </div>
          ) : (
            <div className="tw-text-sm tw-text-[#778da9] tw-border-[1px] tw-border-dashed">
              Drop your file here
            </div>
          )
        }
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="*"
      />

      <ErrorMessage>{errorMsg}</ErrorMessage>
    </>
  );
};

export default AddUserDataUpload;
