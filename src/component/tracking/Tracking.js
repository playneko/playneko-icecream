import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Close from '@material-ui/icons/Close';
import Create from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from "firebase";

// 컴포넌트
// 모델
import TrackingAddModel from "../../models/TrackingAddModel";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CircularProgressWithLabel = (props) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(props.value,)}%`}</Typography>
            </Box>
        </Box>
    );
};

const Tracking = (props) => {
    const { account, setTracking } = props;
    const hiddenFileInput = React.useRef(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [uploadFlg, setUploadFlg] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [fileUpload, setFileUpload] = React.useState(null);
    const [trackingData, setTrackingData] = React.useState(null);

    const handleOnFileUpload = (file) => {
        // FileReader 객체 생성
        const reader = new FileReader();

        setLoading(true);
        reader.onloadend = (e) => {
            // blob변수에 전달된 파라미터의 배열과 업로드할 파일 타입을 담은 객체를 저장
            const blob = new Blob([e.target.result], { type: "image/jpeg" });

            // 업로드할 파일을 저장할 스토리지의 url -> 파이어베이스 스토리지의 '폴더+파일이름' 으로 구성
            const storageUrl = 'images/' + file.name;

            // 스토리지 참조값 생성
            const storageRef = firebase.storage().ref(storageUrl);

            // blob(업로드할 파일 데이터가 담긴)을 업로드(put)하고 진행률에 따른 변화를 감지하기위해 변수에 저장
            const uploadTask = storageRef.put(blob);

            // 업로드시 진행률에 따른 변화를 감지하기위한 이벤트
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                }
            }, (error) => {
                setError(true);
                setLoading(false);
            }, () => {
                // 로드가 성공적으로 완료되면 이때부터 다운로드 url을 가져올수 있음
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setFileUpload(downloadURL);
                    setLoading(false);
                    setUploadFlg(true);
                });
            });
        }

        reader.onerror = (e) => {
            setError(true);
            setLoading(false);
        };
        reader.readAsArrayBuffer(file);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const comment = event.target.comment.value;

        setTrackingData({
            lat: account.lat,
            lng: account.lng,
            uuid: account.uid,
            title: title,
            comment: comment,
            image: fileUpload ? fileUpload : ""
        });

        event.target.title.value = "";
        event.target.comment.value = "";
    }

    const handleOnClick = (e) => {
        if (!error && !loading && progress < 1) {
            hiddenFileInput.current.click();
        }
    };

    const handleOnChange = (e) => {
        e.preventDefault();
        const fileUploaded = e.target.files[0];
        handleOnFileUpload(fileUploaded);
    };

    const handleOnClose = () => {
        setProgress(0);
        setError(false);
        setLoading(false);
        setTracking(false);
        setUploadFlg(false);
        setFileUpload(null);
        setTrackingData(null);
    };

    TrackingAddModel({trackingData, setTrackingData, setError, setLoading});

    if (trackingData !== null && trackingData.success === true) {
        handleOnClose();
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit} className="tracking-progress" autoComplete="off">
                {error ? <Alert severity="error">처리중 에러가 발생했습니다.</Alert> : ""}
                <TextField id="outlined-basic" name="title" label="제목" variant="outlined" className="tracking-title" />
                <TextField
                    id="outlined-multiline-static"
                    name="comment"
                    label="내용"
                    multiline
                    rows={4}
                    variant="outlined"
                    className="tracking-content"
                />
                <div className="tracking-upload">
                {
                    !error && loading ?
                        <CircularProgressWithLabel value={progress} color="info" />
                    : ""
                }
                {
                    !error && !loading && !uploadFlg ?
                        <Button variant="contained" color="info" type="button" onClick={() => handleOnClick()}>
                            사진선택
                        </Button>
                    : ""
                }
                {
                    !error && !loading && uploadFlg ?
                        <div className="tracking-upload_success">
                        {
                            fileUpload != null ?
                                <img src={fileUpload} className="" />
                            : ""
                        }
                        </div>
                    : ""
                }
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleOnChange}
                    style={{display: 'none'}}
                />
                </div>
                <>
                    <Button variant="contained" color="primary" type="submit">
                        <Create />
                        올리기
                    </Button>{' '}
                    <Button variant="contained" color="primary" type="button" onClick={() => handleOnClose()}>
                        <Close />
                        닫기
                    </Button>
                </>
            </form>
        </div>
    );
}

export default Tracking;