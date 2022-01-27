import React, { Component } from 'react';
import './Displayer.css';
import axios from 'axios';

class Displayer extends Component {
    state = {
        videos: []
    }
    componentDidMount() {
        axios.get('http://localhost:5000/video').then(res => {
            this.setState({ videos: res.data })
        })
    }
    clickHandel = (e)=>{
        if(e.target.getAttribute('id')==='video-box'){
            document.querySelectorAll('.list-item').forEach(vid => vid.classList.remove('active'));
            e.target.classList.add('active');
            let src = e.target.children[0].getAttribute('src');
            document.querySelector('.main-video video').setAttribute('src',src);
            let title = e.target.children[1].innerHTML;
            document.querySelector('.main-video .title-main-video').innerHTML = title;
        }
        if(e.target.getAttribute('id')==='video'){
            let src = e.target.getAttribute('src');
            document.querySelector('.main-video video').setAttribute('src',src);
            document.querySelectorAll('.list-item').forEach(vid => vid.classList.remove('active'));
            e.target.parentElement.classList.add('active');
            let title = e.target.parentElement.children[1].innerHTML;
            document.querySelector('.main-video .title-main-video').innerHTML = title;
        }
        if(e.target.getAttribute('id')==='video-title'){
            let src = e.target.parentElement.children[0].getAttribute('src');
            document.querySelector('.main-video video').setAttribute('src',src);
            document.querySelectorAll('.list-item').forEach(vid => vid.classList.remove('active'));
            e.target.parentElement.classList.add('active');
            let title = e.target.parentElement.children[1].innerHTML;
            document.querySelector('.main-video .title-main-video').innerHTML = title;
        }
    }

    render() {
        return (
            <div className='displayer-container'>
                <div className='main-video'>
                    <video src="" controls autoPlay muted ></video>
                    <div className='title-main-video'></div>
                </div>
                <div className='list-videos' id='list-videos'>
                    {this.state.videos.map(video =>
                        <div className='list-item' onClick={this.clickHandel} id='video-box'>
                            <video src={`http://localhost:5000/video/${video}`} muted id='video'></video>
                            <div className='title-list-item' id='video-title'>{video.replace('.mp4','')}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Displayer;