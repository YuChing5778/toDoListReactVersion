import React, { Component } from 'react';
import editPencil from '../img/pencil.png'
import Axios from 'axios';
// import EditDialog from './editDialog'

class Index extends Component {
    state = {
        todoList: [
            { jobId: '', state: '', jobTitle: '' },
            { jobId: '', state: '', jobTitle: '' },
        ],
        jobItem: { jobTitle: '' },
        isOpenEdit: false,
        isOpenDelete: false,
        dialogData: { jobId: '', state: '', jobTitle: '' }

    }
    async componentDidMount() {

        this.updateList();

    }
    // nav active
    addNavActive = (e) => {
        
        let navBtn = document.getElementsByClassName('nav-link');
        for (let value of navBtn) {
            value.classList.remove('activeNav');
        }
        e.target.classList.add('activeNav');
        this.updateList();
    }
    updateList = async (e) => {
        
        let activeNavText = document.getElementsByClassName('activeNav')[0].innerText;
        switch (activeNavText) {
            case '全部':
                activeNavText = '全部';
                break;
            case '代辦事項':
                activeNavText = '未完成';
                break;
            default:
                activeNavText = '已完成';
                break;
        }
        let result = await Axios.get(`http://localhost:8000/todolist/${activeNavText}`);
        this.state.todoList = result.data;
        
        this.setState({});

    }
    // create todolistItem
    sendJobItem = async (e) => {
        e.preventDefault();
        // console.log(this.state.jobTitle)
        await Axios.post('http://localhost:8000/createJobList', this.state.jobItem);
        this.updateList();
        document.getElementById('keyJob').value = '';
    }
    // closeEditModal
    closeEditModal = (e) => {
        this.setState({ isOpenEdit: false });

    }
    // closeDeleteModal
    closeDeleteModal = (e) => {
        this.setState({ isOpenDelete: false });
        this.updateList();
    }
    updateIncreaseJobInput = (e) => {
        // this.state.jobItem.jobTitle=e.target.value;
        this.setState(({
            jobItem: {
                jobTitle: e.target.value
            }
        }))

    }
    // 對話窗資料
    setDialogData = (index) => {
        this.setState({ dialogData: { ...this.state.todoList[index] } });
        // this.setState({ dialogData: this.state.todoList[index] });

    }
    // 對話視窗輸入框資料更新
    updateEditInputText = (e) => {
        this.state.dialogData.jobTitle = e.target.value;

        this.setState({})

    }
    // 對話視窗radio更新
    updateEditInputRadio = (e) => {

        this.state.dialogData.state = e.target.value;
        this.setState({});

    }
    // 送出編輯資訊
    sendEditJobItem = (e) => {
        e.preventDefault();
        // console.log(this.state.dialogData)
        Axios.post('http://localhost:8000/editJobItem', this.state.dialogData);
        this.closeEditModal();
        this.updateList();
    }
    // 送出刪除資訊
    sendDeleteJobItem = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/deleteJobItem', this.state.dialogData);
        this.closeDeleteModal();
        this.updateList();
    }
    render() {
        // 刪除視窗
        let deleteDialog = (
            <div id="deleteList">
                <button className="closeModal" onClick={this.closeDeleteModal}>&times;</button>
                <form action="">
                    <div>
                        <div id="deleteDes">
                            <input type="text" defaultValue={this.state.dialogData.jobId} hidden />
                            <p>是否刪除 <i> {this.state.dialogData.jobTitle} </i> 事項?</p>
                        </div>
                        <div>
                            <button className="editBtn" type="submit" onClick={this.sendDeleteJobItem}>確定</button>
                            <button className="cancelBtn" onClick={this.closeDeleteModal}>取消</button>
                        </div>
                    </div>
                </form>

            </div>
        );
        // 編輯室窗
        let editDialog = (
            <div id="editList">

                <button className="closeModal" onClick={this.closeEditModal}>&times;</button>
                <form action="#">
                    <div id='jobId'>
                        <input id="editJob" type="text" placeholder="請輸入代辦事項" onChange={this.updateEditInputText} value={this.state.dialogData.jobTitle} />
                    </div>
                    <div>
                        <label>
                            <input name="state" type="radio" value="未完成" onChange={this.updateEditInputRadio} checked={this.state.dialogData.state === '未完成' ? 'checked' : ''} />未完成
                        </label>
                        <label>
                            <input name="state" type="radio" value="已完成" onChange={this.updateEditInputRadio} checked={this.state.dialogData.state === '已完成' ? 'checked' : ''} />已完成
                        </label>
                    </div>
                    <div>
                        <button className="editBtn" onClick={this.sendEditJobItem}>確定</button>
                        <button className="cancelBtn" onClick={this.closeEditModal} >取消</button>
                    </div>
                </form>

            </div>
        );
        if (!this.state.isOpenEdit) {
            editDialog = null;
        }
        if (!this.state.isOpenDelete) {
            deleteDialog = null;
        }
        return (
            <React.Fragment>
                <div className="containerWrapper">
                    <div>

                        <h1 className="title">To Do List</h1>
                    </div>
                    <div className="formWrapper">
                        <form id="sentJobText" action="#" method='post'>
                            <div className="formGroup">
                                <div className="inputWrap">
                                    <input name='jobTitle' id="keyJob" type="text" onChange={this.updateIncreaseJobInput} placeholder="請輸入代辦事項" required />

                                </div>
                                <div className="sendBtn">
                                    <button onClick={this.sendJobItem} className="sentBtn">確定</button>
                                    {/* <input type="submit" className="sentBtn" value={'確定'} /> */}
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="listWrapper">


                        <ul className="navWrapper">
                            <li className="navItem ">
                                <button className="nav-link activeNav " onClick={this.addNavActive} >全部</button>
                            </li>
                            <li className="navItem">
                                <button className="nav-link" onClick={this.addNavActive} >代辦事項</button>
                            </li>
                            <li className="navItem">
                                <button className="nav-link" onClick={this.addNavActive} >已完成</button>
                            </li>
                        </ul>

                        <table id="allArea" className="list">
                            <thead>

                                <tr>
                                    <th>事項</th>
                                    <th>狀態</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.todoList.map((item, index) =>
                                    <tr key={index}>
                                        <td >{item.jobTitle}</td>
                                        <td>{item.state}</td>
                                        <td>
                                            <img className="pencil" src={editPencil} alt='pencil' /><button className="edit" onClick={(e) => { this.setState({ isOpenEdit: true }); this.setDialogData(index) }}> 編輯</button>
                                            <button className="delete" onClick={(e) => { this.setState({ isOpenDelete: true }); this.setDialogData(index) }} ><span>&times;</span> 刪除</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {editDialog}
                    {deleteDialog}
                </div>
            </React.Fragment>

        );
    }
}

export default Index;