import React, { Component } from 'react';
// import Axios from 'axios';
class EditDialog extends Component {
    
    state = {
        editData: {
            jobId: this.props.dialogData.jobId,
            state: this.props.dialogData.state,
            jobTitle: this.props.dialogData.jobTitle
        },

    }
    componentDidMount(){
        // console.log(this.props.dialogData)
        // this.setState(({
        //     editData:this.props.dialogData
        // }))
    }
    // 更新input text值
    updateJobInput = (e) => {
        this.setState(({
            editData: {
                jobTitle: e.target.value
            }
        }));
        
        // console.log(this.state)
    }
    // 更新radio值
    updateRadio = (e) => {
        let radioValue=e.target.value;
        this.setState(({
            editData: {
                state: radioValue
            }
        }));
        
    }
    // 送出編輯資料
    sendEditData= async(e)=>{
        // e.preventDefault();
        // await this.setState(({
        //     editData:{
        //         jobId:document.getElementById('jobId').getAttribute('data-jobid')
        //     }
        // }))
        // console.log(this.state)
    }
    render() {
        let editDialog = (
            <div id="editList">
                
                <button className="closeModal" onClick={this.props.isCloseEdit}>&times;</button>
                <form action="#">
                    <div id='jobId' data-jobid={this.state.editData.jobId}>
                        <input onChange={this.updateJobInput} id="editJob" type="text" placeholder="請輸入代辦事項" value={this.state.editData.jobId} />
                    </div>
                    <div>
                        <label>
                            <input name="state" type="radio" value="未完成"
                                checked={this.props.dialogData.state === '未完成' ? 'checked' : ''}
                                onChange={this.updateRadio} />未完成
                        </label>
                        <label>
                            <input name="state" type="radio" value="已完成"
                                onChange={this.updateRadio}
                                checked={this.props.dialogData.jobTitle === '已完成' ? 'checked' : ''} />已完成
                        </label>
                    </div>
                    <div>
                        <button onClick={this.sendEditData} className="editBtn" >確定</button>
                        <button className="cancelBtn" onClick={this.props.isCloseEdit}>取消</button>
                    </div>
                </form>

            </div>
        );
        if (!this.props.isOpenEdit) {
            editDialog = null;
        }
        return (
            <div>

                {editDialog}
            </div>
        );
    }
}

export default EditDialog;