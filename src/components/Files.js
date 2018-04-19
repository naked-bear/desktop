const {
    shell,
    remote
} = window.require('electron');
import React, { Component } from 'react';
const files = require('../api/files');
const path = require('path');
const nb = require('../../nakedbear');
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip'
const randomWords = require('random-words');
const fs = require("fs");
import Loading from './ui/Loading';


class Files extends React.Component {
    constructor(props){
        super(props);

        this.browse = this.browse.bind(this);
        this.remove = this.remove.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.getFileSize = this.getFileSize.bind(this);
        this.generateId = this.generateId.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            search: {
                term: '',
                nakedFiles: []
            },
            isLoading: true,
            nakedFiles: []
        }
    }
    componentWillMount(){
        let self = this;

        files.loadFiles().then(function (files) {
            self.setState({
                isLoading: false,
                nakedFiles: files,
                copied: false
            });
        });
    }
    render() {

        let self = this;
        let session = this.props.getSession();

        let noFiles = (<section className="section">
            <div className="container">
                <h3 className="title">No Files Added</h3>
                <p>You can browse for a file or drag and drop it here.</p>
            </div>
        </section>);

        let files = this.state.nakedFiles;

        if(this.state.search.term.length > 0){
            files = this.state.search.nakedFiles;
        }


        let yesFiles = (<div>

                <div className="field search">
                    <p className="control has-icons-left spacing-none">
                        <input className="input" type="text" style={{backgroundColor:"#dedede"}} value={this.state.search.term} onChange={(e) => this.search(e.target.value)} placeholder="Search..."/>
                        <span className="icon is-small is-left" style={{color:'#999999'}}>
                            <i className="fa fa-search"/>
                        </span>
                    </p>
                </div>

                <section className="section top">
                    <div className="pane middle">
                        <div className="pane table-head">
                            <table className="table is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th className="col1" style={{paddingLeft:'32px'}}>Name</th>
                                            <th className="col2">Size</th>
                                            <th className="col3">Link</th>
                                            <th className="col4 has-text-centered">Downloads</th>
                                            <th className="col5" style={{paddingRight:'32px'}}>
                                                <a onClick={this.removeAll} className="button is-danger is-small is-pulled-right">
                                                    <span className="icon is-small">
                                                      <i className="fa fa-trash" />
                                                    </span>
                                                    <span>Clear All</span>
                                                </a>
                                            </th>
                                        </tr>
                                    </thead>
                            </table>
                        </div>
                        <div className="pane table-body fill">
                            <table className="table is-fullwidth">
                                <tbody>
                                    {
                                        files.map(function(item, i){
                                            if(fs.existsSync(item.path + item.name)) {
                                                let url = nb.url + '/' + session.username + '/' + item.id;
                                                return (<tr key={i} className='nakedFile'>
                                                    <td className="col1" style={{paddingLeft: '32px'}}>
                                                        <a onClick={() => shell.openItem(item.path)}>{item.name}</a>
                                                    </td>
                                                    <td className="col2">
                                                        {self.getFileSize(item.path + item.name)}
                                                    </td>
                                                    <td className="col3">
                                                        <CopyToClipboard text={url}
                                                                         onCopy={() => self.setState({copied: true})}>
                                                            <a data-tip='Click to Copy'>{url}</a>
                                                        </CopyToClipboard>
                                                        <ReactTooltip />
                                                    </td>
                                                    <td className='col4 has-text-centered'>0</td>
                                                    <td className='col5 has-text-right' style={{paddingRight: '32px'}}>
                                                        <a className='delete' onClick={() => self.remove(i, item._id)}/>
                                                    </td>
                                                </tr>);
                                            } else {
                                                self.remove(i, item._id);
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        );

        let resp = noFiles;

        if(this.state.nakedFiles.length > 0){
            resp = yesFiles;
        }

        return(
            <div id="nakedFiles">
                <Loading isLoading={this.state.isLoading}/>
                {resp}
                <div className="bottom">
                    <a onClick={this.browse} className="button is-naked is-fullwidth bottom-button">
                        <span className="large bolded">Browse...</span>
                    </a>
                </div>
            </div>
        )
    }
    browse(){

        let self = this;

        let newFiles = [];

        let paths = remote.dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});

        if(paths !== null && paths.length > 0) {

            for (let i = 0; i < paths.length; i++) {

                let name = paths[i].replace(/^.*[\\\/]/, '');

                let file = {
                    id: this.generateId(),
                    name: name,
                    path: paths[i].replace(name, ''),
                    added: new Date()
                };

                let shouldAddFile = true;

                for (let j = 0; j < this.state.nakedFiles.length; j++) {
                    if (this.state.nakedFiles[j].path+this.state.nakedFiles[j].name === file.path+file.name) {
                        shouldAddFile = false;
                        break;
                    }
                }

                if (shouldAddFile) {
                    newFiles.push(file);
                }

            }


            files.addFiles(newFiles).then(function (addedFiles) {
                let f = self.state.nakedFiles;
                f.push(...addedFiles);
                self.setState({
                    nakedFiles: f
                });
            }).catch(err => console.log(err));
        }
    }
    remove(i, fileId){
        let self = this;
        files.removeFile(fileId).then(function(num){
            let f = self.state.nakedFiles;
            f.splice(i, 1);

            self.setState({
                nakedFiles: f
            });
        }).catch(err => console.log(err));
    }
    removeAll(){
        let self = this;
        remote.dialog.showMessageBox({buttons: ['Ok', 'Cancel'], message: 'Remove all naked files?' }, function (index) {
            if(index === 0){
                files.removeAllFiles().then(function (num) {
                    self.setState({
                        nakedFiles: []
                    })
                });
            }
        });
    }
    generateId(){
        let word = randomWords();
        for(let i=0; i<this.state.nakedFiles.length; i++){
            if(word === this.state.nakedFiles[i].id){
                return this.generateId();
            }
        }
        return word;
    }
    getFileSize(filePath) {
        let size = fs.statSync(filePath).size;
        let i = Math.floor( Math.log(size) / Math.log(1024) );
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    }
    search(value){
        let results = [];
        for(let i=0; i<this.state.nakedFiles.length; i++){
            if(this.state.nakedFiles[i].name.toUpperCase().indexOf(value.toUpperCase()) > -1){
                results.push(this.state.nakedFiles[i]);
            }
        }

        this.setState({
            search: {
                term: value,
                nakedFiles: results
            }
        })
    }
}

export default Files;