const ErrorMessage = (props) => {
    return (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800" role="alert">
            <span className="font-medium">{props.message}</span>
        </div>
    )
};

export default ErrorMessage;