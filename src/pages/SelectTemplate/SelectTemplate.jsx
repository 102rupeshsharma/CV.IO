
import { Navbar } from '../../Components/Navigation/Navbar'
import { Link } from 'react-router-dom';
import React,{useState} from 'react'
import {templateImagesPaths} from '../../Components/Data/Data'
import { useDispatch } from 'react-redux'
import {updateState} from '../../ReduxManager/dataStoreSlice'
import shortid from 'shortid';

export const TemplatePage = () => {
    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver')
    
    const dispatch = useDispatch();
    return (
        <div style={{minWidth:'300px'}}>
            <Navbar />
    
            <div className='d-flex justify-content-center mt-5' >
                <h3 className='p-2 rounded' style={{backgroundColor:'aliceblue'}}>Select a Template to get started!</h3>
            </div>
           
            <div className='container' style={{color:'#1f4287',}}>
                <div className='row'>
                    {templateImagesPaths.map((currentTemplate)=>{
                            return(
                                <div className='col col-lg-3 col-md-6  col-12 mt-5' key={shortid.generate()}>
                                    <div 
                                        style= {{ position:'relative'}}
                                        onMouseOver= {()=>{
                                            setIsMouseOver(currentTemplate.name)
                                        }}
                                        onMouseOut= {()=>{
                                            setIsMouseOver('MouseIsNotOver')
                                        }}
                                    >
                                    <div className='w-100 d-flex justify-content-center'><h3>{currentTemplate.name}</h3></div>
                                    <img className="w-100 image-aspect-ratio" src={currentTemplate.imageSource} alt='template'/>
                                    {isMouseOver === currentTemplate.name         
                                        ?<Link to="/progress/personalInfo">
                                            <button className='btn btn-primary'
                                                    style={{position: 'absolute',top:'50%' , right:'30%',}}
                                                    onClick= {()=>{
                                                        dispatch(updateState({ 
                                                        key: 'selectedTemplate',
                                                        value:currentTemplate.name
                                                        }))
                                                    }}
                                            >
                                            Use Template
                                            </button>
                                        </Link>
                                        :null
                                    }
                                </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
