import { useState, useEffect } from 'react'
import {Avatar, Button} from '@mui/material'
import Card from '../components/UI/Card'
import { useSelector, useDispatch } from 'react-redux'
import uploadImage from '../utils/uploadImage'
import { deleteUser, updateUser } from '../features/auth/authSlice'
import { getMySurveys } from '../features/surveys/surveySlice'
import { FaEdit } from 'react-icons/fa'
import './css/Profile.css'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MySurveys from './MySurveys'
// import Spinner from '../components/Spinner'

const Profile = () => {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const { surveys } = useSelector((state) => state.surveys)
    const [isEditing, setIsEditing] = useState(false)
    const [file, setFile] = useState()
    const [name, setName] = useState(user.name)
    const [uploadingImg, setUploadingImg] = useState(false)
    const [formData, setFormData] = useState()
    const [deleting, setDeleting] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getMySurveys())


    }, [user, isError, isSuccess, message])


    const handleDeleteAccount = async () => {
        dispatch(deleteUser(user._id))
        navigate('/')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        // if (uploadingImg) return;
        const userData = {
            img: formData,
            name: name,
        }

        dispatch(updateUser(userData))
        setFormData(null)
        setIsEditing(false)
        toast.success("Profile updated! Changes may take a few minutes.", {
            autoClose: 4000,

        })


    }

    const handleFileChange = async (event) => {
        const [file] = event.target.files;
        if (!file) return;

        setUploadingImg(true);

        const uploadedUrl = await uploadImage(file);
        setFormData(uploadedUrl)
        // setFormData({ ...formData, img: uploadedUrl });
        setUploadingImg(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    return (
        <div className='contentContainer'>
            <Card type="profile">
                <div className='profile-actions'><Button onClick={() => { setIsEditing(!isEditing) }} variety="small outlined">
                    {isEditing ? (
                        <div>Cancel</div>
                    ) : (
                        <div> Edit Profile <FaEdit /> </div>
                    )}

                </Button></div>
                <div className='profile-image'>
                    
                        <Avatar alt={user.name} src={formData ? formData : user.img ? user.img : null} sx={{ width: 80, height: 80 }} />
                </div>
                {isEditing ? (

                    <div className='update-form'>
                        <form onSubmit={handleSubmit} className="form-group">
                            <label >🖼️ Change Profile Picture</label>
                            <input onChange={handleFileChange} value={file} type="file" />
                            <label >👤 Change Display Name</label>
                            <input onChange={handleNameChange} className='name-input' type="text" value={name} id="name" />
                            <Button type="submit" variant='contained' disabled={uploadingImg | false}> 
                            {uploadingImg ? (
                                "📡 Uploading Image ..."
                            ) : (
                                "Save"

                            )}
                            
                            </Button>
                            
                            {/* <Button onClick={() => { 
                                setIsEditing(!isEditing) 
                                setFormData(null) }} variety="small outlined">Cancel</Button> */}
                        </form>
                    </div>
                ) : (
                    <></>
                )}
                <h3>
                    {!isEditing ? (user.name) : (
                        <></>
                        // <form className='name-change-form' onSubmit={handleSubmit}>
                        //     <input className='name-input' type="text" value={name} id="name" />
                        //     <Button variety="small outlined">submit</Button>

                        // </form>
                    )}

                </h3>
                <div className='user-stats'>
                    <div>🎂 Member since {new Date(user.createdAt).toLocaleDateString('en-US')}</div>
                    {surveys.length > 0 ? (
                        <div>📋 Created {surveys.length} survey{surveys.length > 1 ? "s" : ""}</div>
                    ) : (
                        <div>💤 You haven't created any surveys. <Link to="/create">Make one!</Link></div>
                    )}
                    {user.participatedIn > 0 ? (
                        <div>🏅 Participated in {user.participatedIn} survey{user.participatedIn > 1 ? "s" : ""}</div>
                    ) : (
                        <div>💤 You haven't participated in any surveys.</div>
                    )}
                </div>
                <div className='profile-actions delete-actions'>
                    {isEditing ? (
                        <Button onClick={() => { setDeleting(true) }} variety="danger small">Delete Account</Button>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </Card>
            <MySurveys />
            {deleting &&
                <Modal>
                    <h2>Are you sure?</h2>
                    <p><small>This is permanent and cannot be undone.</small></p>
                    <Button onClick={handleDeleteAccount} variety="danger maxwide">Delete My Account</Button>
                    <Button onClick={() => { setDeleting(false) }} variety="outlined maxwide">Cancel</Button>
                </Modal>
            }
        </div>
    )
}

export default Profile