import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const PeopleFileUpload = (props: any) => {
  const {
    onChange,
    onRemove,
    instance,
    refresh,
    deleteFileAfterRemove = false,
  } = props;
  // specify upload params and url for your files
  const getUploadParams = ({ meta }: any) => {
    return {
      url:
        process.env.REACT_APP_BASE_URL +
        `/api/contact-imports/${instance.id}/file/`,
    };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    console.log(status, meta, file);
    if (status === "done") refresh();
    if (deleteFileAfterRemove) {
      if (status === "removed") {
        onRemove();
      }
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files);
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      multiple={false}
      autoUpload={true}
      canCancel={false}
      maxFiles={1}
      SubmitButtonComponent={() => null}
      inputContent="Drop A CSV"
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept=".csv"
    />
  );
};

export default PeopleFileUpload;
