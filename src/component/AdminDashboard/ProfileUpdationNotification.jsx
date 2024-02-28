import React,{useContext} from 'react'
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import MyContext from '../../store/MyContext';

function ProfileUpdationNotification() {
    const {isProfileVisible,setIsProfileVisible}=useContext(MyContext);
    const HandleConfirmation=()=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: 'Complete your profile and activate this service',
            // text: "Complete your profile and activate this service",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Complete Profile & Activate',
            cancelButtonText: "Cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                setIsProfileVisible(true)
            //   swalWithBootstrapButtons.fire({
            //     title: "Update profile",
            //     text: "You can update your profile",
            //     icon: "success"
            //   });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                // title: "Cancelled",
                text: "Cancelled",
                icon: "error"
              });
            }
          });
    }
  return (
    <>
      <Button onClick={HandleConfirmation} className='btn btn-sm' style={{backgroundColor:'green',border:'none'}}>Activate Now</Button>
    </>
  )
}

export default ProfileUpdationNotification