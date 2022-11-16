import React from 'react';
import './App.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        if (status) {
            handleStatus(status, params);
        }
    }, []);

    return (
        <div className="App">
            <ToastContainer/>
        </div>
    );
}

function handleStatus(status: string, params: URLSearchParams) {
    switch (status) {
        case 'success':
            showSuccessToast();
            break;
        case 'error':
            const code = params.get('code');
            const message = handleErrorStatus(code);
            showErrorToast(message);
            break;
    }
}

function handleErrorStatus(code: string | null) {
    let message;
    switch (code) {
        case '1':
            message = 'No data received from JustGiving';
            break;
        case '2':
            message = 'Data received from JustGiving was not formatted correctly';
            break;
        case '3':
            message = 'Donation id or player id not present in JustGiving data';
            break;
        case '4':
            message = 'Player lock not found - is the player dead?';
            break;
        case '5':
            message = 'Donation through JustGiving failed please try again';
            break;
        default:
            message = `Error occured with status code: ${code}`
            break;
    }
    return message;
}

function showSuccessToast() {
    toast.success('Donation successful! You will be revived shortly.', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
        theme: "colored",
    });
}

function showErrorToast(message: string) {
    toast.error(message, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
        theme: "colored",
    });
}

export default App;
