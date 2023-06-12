const SuccessMessage = (props) => {
    return (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-800" role="alert">
            <span className="font-medium">{props.message}</span> 
        </div>
    )
};

export default SuccessMessage;
