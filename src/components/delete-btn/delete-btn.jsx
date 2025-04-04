import "./delete-btn.css"

function DeleteBtn({textDel, deleteBlock}) {
    return (
        <>
            <button className="del-btn" type="button" onClick={deleteBlock}>{textDel}</button>
        </>
    )
}

export default DeleteBtn;