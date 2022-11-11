import React, {Component} from 'react';

export class Home extends Component{

    render(){
        return (
            <div className='mt-5 d-flex justify-content-right'>
                <div className='block'>
                    <img className='scalable-photo' src={require('./helpers/pictures/homepage_bard.jpg')} />
                    <p className='subheader' >
                        Make yourself comfortable and listen to the bard's singing...
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;