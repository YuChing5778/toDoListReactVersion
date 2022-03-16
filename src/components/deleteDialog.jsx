import React, { Component } from 'react';

class DeleteDialog extends Component {
    state = {}
    render() {
        let deleteDialog=(
            <div id="deleteList">
                <button className="closeModal" onClick={this.props.isCloseDelete}>&times;</button>
                <form action="">
                    <div>
                        <div id="deleteDes">
                            <p>是否刪除<i>XXXXX</i>事項?</p>
                        </div>
                        <div>
                            <button className="editBtn" type="submit">確定</button>
                            <button className="cancelBtn" onClick={this.props.isCloseDelete}>取消</button>
                        </div>
                    </div>
                </form>

            </div>
        );
        if(! this.props.isOpenDelete){
            deleteDialog=null;
        }
        return (
            <div>
                {deleteDialog}
            </div>
        );
    }
}

export default DeleteDialog;