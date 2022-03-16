import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/toDoList.css';
import Index from './components/index';
import DeleteDialog from './components/deleteDialog';
import EditDialog from './components/editDialog'


class App extends Component {
  state = {

    isOpenEdit: false,
    isOpenDelete: false,
    
  }
  
  render() {

    return (
      <React.Fragment>

        <BrowserRouter>
          <Routes >
            <Route path='/' element={
              <Index
                isOpenEdit={this.openEditModal}
                isOpenDelete={(e)=>{this.setState({isOpenDelete:true})}} />}></Route>
                
          </Routes>
        </BrowserRouter>

        {/* <EditDialog isOpenEdit={this.state.isOpenEdit} isCloseEdit={(e) => this.setState({ isOpenEdit: false })} /> */}
        <DeleteDialog isOpenDelete={this.state.isOpenDelete} isCloseDelete={(e)=>{this.setState({isOpenDelete:false})}}/>
      </React.Fragment>


    );
  }
}

export default App;