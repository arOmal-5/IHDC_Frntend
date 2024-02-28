import React, { useEffect, useState,useContext} from 'react';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../../store/MyContext';

const ProfileStatusChart = () => {
 const {isProfileVisible,setIsProfileVisible}=useContext(MyContext);

    const token = localStorage.getItem('usertoken');
    const [userData, setUserData] = useState([]);
    const{profilePercentage,setProfilePercentage}=useContext(MyContext)
    // const[profileTriger,setProfileTriger]=useState(Date.now())
    const{profileTriger,setProfileTriger}=useContext(MyContext)
    const{apiTriger,setApiTriger}=useContext(MyContext)

    useEffect(() => {

        const fetchData = async () => {
          try {

            if(profilePercentage===100){
              const profileresponse = await axiosInstance.patch('userapp/user/profile/completion/invoice/genetation/if/needed',null,{
                headers:{
                  Authorization: `Bearer ${token}`,
                }
              })

              console.log('profileresponse',profileresponse);
            }
            
            const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('userresponsedata',response.data);
            const {
              id,
              user: {
                id: userId,
                name,
 
              },
              address_line_1,
              address_line_2,
              state,
              phone,
              district,
              sub_district,
              local_body,
              village,
              land_mark,
            } = response.data;
      
            const newData = {
              id,
              user: {
                id: userId,
                name,
                
                
              },
              email:response.data?.user?.email,
              address_line_1,
              address_line_2,
              phone,
              state,
              district,
              sub_district,
              local_body,
              village,
              land_mark,
            };
      console.log('newData',newData);
      
            setUserData(newData);

            const { totalFields, nonEmptyFieldCount } = countNonEmptyFields(newData);
            
            const percentage = (nonEmptyFieldCount / totalFields) * 100;
            setProfilePercentage(percentage);
           
          } catch (error) {
            console.log('error', error);
          }
        };
     
        const countNonEmptyFields = (data) => {
          
          let totalFields = 0;
          let nonEmptyFieldCount = 0;
  
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              totalFields++;
              if (data[key] !== null && data[key] !== '') {
                nonEmptyFieldCount++;
              }
            }
          }
      
          return { totalFields, nonEmptyFieldCount };
        };
      
        fetchData();
      }, [profileTriger,apiTriger,profilePercentage]);

      // useEffect(()=>{
      //   if(profilePercentage===100){
      //     const profileCompleted = async () => {
      //       try {
      //         // Make your API call here
      //         const response = await axiosInstance.patch('userapp/user/profile/completion/invoice/genetation/if/needed',
          
      //         null, {
      //             headers: {
      //               Authorization: Bearer ${token},
      //             },
      //           }
      //         );
        
      //         // Handle the API response as needed
      //         console.log('API call response', response);
        
      //         // Optionally, update state or perform other actions based on the API response
      //       } catch (error) {
      //         // Handle API call errors
      //         console.error('API call error', error);
      //       }
      //     };
      //     profileCompleted()
      //   }
        

      // },[apiTriger])

      
      
      

    console.log('graph response data', userData);

    const parsedPercentage = parseInt(profilePercentage, 10);
      
    const barWidth = `${parsedPercentage === 100 ? 100 : parsedPercentage * 0.8}%`;
    const transition = parsedPercentage === 100 ? 'none' : 'width 0.5s ease';


    const handleProfile=()=>{
      setIsProfileVisible(true)
    }

    return (
        <div>
            {parsedPercentage < 100 ? (
                <>
               <FontAwesomeIcon color='red' icon={faExclamationTriangle} beat /> <span onClick={handleProfile} style={{cursor:'pointer'}}>Complete your Profile</span> 
                </>
  
) : (
  <>
     <span style={{fontWeight:'600'}}>Profile Completed </span><FontAwesomeIcon color='green' icon={faCircleCheck} fade />
  </>
)}

{parsedPercentage < 100 && (
      <div
        style={{
          width: '100%',
          height: '25px',
          backgroundColor: '#536878',
          borderRadius: '5px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: barWidth,
            height: '100%',
            backgroundColor: '#081d29',
            transition: transition,
          }}
        >
          <p
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: '200',
            }}
          >
            {parsedPercentage}%
          </p>
        </div>
      </div>
    )}
        </div>
    );
};

export default ProfileStatusChart;








// import React, { useEffect, useState,useContext} from 'react';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationTriangle,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import MyContext from '../../store/MyContext';

// const ProfileStatusChart = () => {
//  const {isProfileVisible,setIsProfileVisible}=useContext(MyContext);

//     const token = localStorage.getItem('usertoken');
//     const [userData, setUserData] = useState([]);
//     const{profilePercentage,setProfilePercentage}=useContext(MyContext)
//     const{apiTriger,setApiTriger}=useContext(MyContext)
//     const{profileTriger,setProfileTriger}=useContext(MyContext)




//     // const profileCompleted = async (apiData) => {
//     //   try {
//     //     // Make your API call here
       
//     //     const response = await axiosInstance.patch('userapp/user/profile/completion/invoice/genetation/if/needed',
    
//     //     null, {
//     //         headers: {
//     //           Authorization: `Bearer ${token}`,
//     //         },
//     //       }
//     //     );
  
//     //     // Handle the API response as needed
//     //     // console.log('API call response', response);
  
//     //     // Optionally, update state or perform other actions based on the API response
//     //   } catch (error) {
//     //     // Handle API call errors
//     //     // console.error('API call error', error);
//     //   }
//     // };

//     useEffect(() => {
//         const fetchData = async () => {
//           try {

//             if(profilePercentage===100){
//               const profileresponse=await axiosInstance.patch('userapp/user/profile/completion/invoice/genetation/if/needed',null,{
//                 headers:{
//                   Authorization: `Bearer ${token}`,
//                 }
//               })
//               console.log('profileresponse',profileresponse);
//             }
            
            
//             const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             // console.log('userresponsedata',response.data);
//             const {
//               id,
//               user: {
//                 id: userId,
//                 name,
                
               
//               },
//               address_line_1,
//               address_line_2,
//               state,
//               phone,
//               district,
//               sub_district,
//               local_body,
//               village,
//               land_mark,
//             } = response.data;
      
//             const newData = {
//               id,
//               user: {
//                 id: userId,
//                 name,
                
//               },
//               email:response.data?.user?.email,
//               address_line_1,
//               address_line_2,
//               phone,
//               state,
//               district,
//               sub_district,
//               local_body,
//               village,
//               land_mark,
//             };
//       // console.log('newData',newData);
      
//             setUserData(newData);

//             const { totalFields, nonEmptyFieldCount } = countNonEmptyFields(newData);
            
//             const percentage = (nonEmptyFieldCount / totalFields) * 100;
//             setProfilePercentage(percentage);
//             // if (percentage === 100) {
//             //   // console.log('calling profileCompleted 100');

//             //   await profileCompleted();
//             // }
           
//           } catch (error) {
//             console.log('error', error);
//           }
//         };
     
//         const countNonEmptyFields = (data) => {
          
//           let totalFields = 0;
//           let nonEmptyFieldCount = 0;
  
//           for (const key in data) {
//             if (data.hasOwnProperty(key)) {
//               totalFields++;
//               if (data[key] !== null && data[key] !== '') {
//                 nonEmptyFieldCount++;
//               }
//             }
//           }
      
//           return { totalFields, nonEmptyFieldCount };
//         };
      
//         fetchData(); 
//       }, [profileTriger]);
      
      

//     // console.log('graph response data', userData);

//     const parsedPercentage = parseInt(profilePercentage, 10);
      
//     const barWidth = `${parsedPercentage === 100 ? 100 : parsedPercentage * 0.8}%`;
//     const transition = parsedPercentage === 100 ? 'none' : 'width 0.5s ease';


//     const handleProfile=()=>{
//       setIsProfileVisible(true)
//     }

//     return (
//         <div>
//             {parsedPercentage < 100 ? (
//                 <>
//                <FontAwesomeIcon color='red' icon={faExclamationTriangle} beat /> <span onClick={handleProfile} style={{cursor:'pointer'}}>Complete your Profile</span> 
//                 </>
  
// ) : (
//   <>
//      <span style={{fontWeight:'600'}}>Profile Completed </span><FontAwesomeIcon color='green' icon={faCircleCheck} fade />
//   </>
// )}

// {parsedPercentage < 100 && (
//       <div
//         style={{
//           width: '100%',
//           height: '25px',
//           backgroundColor: '#536878',
//           borderRadius: '5px',
//           overflow: 'hidden',
//           position: 'relative',
//         }}
//       >
//         <div
//           style={{
//             width: barWidth,
//             height: '100%',
//             backgroundColor: '#081d29',
//             transition: transition,
//           }}
//         >
//           <p
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               color: 'white',
//               fontWeight: '200',
//             }}
//           >
//             {parsedPercentage}%
//           </p>
//         </div>
//       </div>
//     )}
//         </div>
//     );
// };

// export default ProfileStatusChart;





















// #Some profile % display error 
// 
// import React, { useEffect, useState,useContext} from 'react';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationTriangle,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import MyContext from '../../store/MyContext';

// const ProfileStatusChart = () => {
//  const {isProfileVisible,setIsProfileVisible}=useContext(MyContext);

//     const token = localStorage.getItem('usertoken');
//     const [userData, setUserData] = useState([]);
//     const{profilePercentage,setProfilePercentage}=useContext(MyContext)

    

//     useEffect(() => {
//       // console.log('token' , token)
//         const fetchData = async () => {
//           try {
//             const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             // console.log('userresponsedata',response.data);
//             const {
//               id,
//               user: {
//                 id: userId,
//                 name,
                
//                 phone,
//               },
//               address_line_1,
//               address_line_2,
//               state,
//               district,
//               sub_district,
//               local_body,
//               village,
//               land_mark,
//             } = response.data;
      
//             const newData = {
//               id,
//               user: {
//                 id: userId,
//                 name,
            
//               },
//               email:response.data?.user?.email,
//               phone:response.data?.user?.email,
//               address_line_1,
//               address_line_2,
//               state,
//               district,
//               sub_district,
//               local_body,
//               village,
//               land_mark,
//             };
//       // console.log('newData',newData);
      
//             setUserData(newData);

//             const { totalFields, nonEmptyFieldCount } = countNonEmptyFields(newData);
            
//             const percentage = (nonEmptyFieldCount / totalFields) * 100;
//             setProfilePercentage(percentage);
//             if (percentage === 100) {
//               // console.log('calling profileCompleted 100');

//               await profileCompleted();
//               // console.log('');
//             }
           
//           } catch (error) {
//             // console.log('error', error);
//           }
//         };
     
//         const countNonEmptyFields = (data) => {
          
//           let totalFields = 0;
//           let nonEmptyFieldCount = 0;
  
//           for (const key in data) {
//             if (data.hasOwnProperty(key)) {
//               totalFields++;
//               if (data[key] !== null && data[key] !== '') {
//                 nonEmptyFieldCount++;
//               }
//             }
//           }
      
//           return { totalFields, nonEmptyFieldCount };
//         };
      
//         fetchData();
//       }, []);
    
      

//       const profileCompleted = async (apiData) => {
//         try {
//           // Make your API call here
//           const response = await axiosInstance.patch('userapp/user/profile/completion/invoice/genetation/if/needed',
      
//           null, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
    
//           // Handle the API response as needed
//           // console.log('API call response', response);
    
//           // Optionally, update state or perform other actions based on the API response
//         } catch (error) {
//           // Handle API call errors
//           // console.error('API call error', error);
//         }
//       };
      

//     // console.log('graph response data', userData);

//     const parsedPercentage = parseInt(profilePercentage, 10);
      
//     const barWidth = `${parsedPercentage === 100 ? 100 : parsedPercentage * 0.8}%`;
//     const transition = parsedPercentage === 100 ? 'none' : 'width 0.5s ease';


//     const handleProfile=()=>{
//       setIsProfileVisible(true)
//     }

//     return (
//         <div>
//             {parsedPercentage < 100 ? (
//                 <>
//                <FontAwesomeIcon color='red' icon={faExclamationTriangle} beat /> <span onClick={handleProfile} style={{cursor:'pointer'}}>Complete your Profile</span> 
//                 </>
  
// ) : (
//   <>
//      <span style={{fontWeight:'600'}}>Profile Completed </span><FontAwesomeIcon color='green' icon={faCircleCheck} fade />
//   </>
// )}

// {parsedPercentage < 100 && (
//       <div
//         style={{
//           width: '100%',
//           height: '25px',
//           backgroundColor: '#536878',
//           borderRadius: '5px',
//           overflow: 'hidden',
//           position: 'relative',
//         }}
//       >
//         <div
//           style={{
//             width: barWidth,
//             height: '100%',
//             backgroundColor: '#081d29',
//             transition: transition,
//           }}
//         >
//           <p
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               color: 'white',
//               fontWeight: '200',
//             }}
//           >
//             {parsedPercentage}%
//           </p>
//         </div>
//       </div>
//     )}
//         </div>
//     );
// };

// export default ProfileStatusChart;



















// import React, { useEffect, useState,useContext} from 'react';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationTriangle,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import MyContext from '../../store/MyContext';

// const ProfileStatusChart = () => {
//  const {isProfileVisible,setIsProfileVisible}=useContext(MyContext);

//     const token = localStorage.getItem('usertoken');
//     const [userData, setUserData] = useState([]);
//     const{profilePercentage,setProfilePercentage}=useContext(MyContext)

    

//     useEffect(() => {
//       // console.log('token' , token)
//         const fetchData = async () => {
//           try {
//             const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             // console.log('userresponsedata',response.data);
//             const {
//               id,
//               user: {
//                 id: userId,
//                 name,
                
//                 phone,
//               },
//               address_line_1,
//               address_line_2,
//               state,
//               district,
//               sub_district,
//               local_body,
//               village,
//               land_mark,
//             } = response.data;
      
//             const newData = {
//               id,
//               user: {
//                 id: userId,
//                 name,
                
//                 phone,
//               },
//               email:response.data?.user?.email,
//               address_line_1,
//               address_line_2,
//               state,
//               district,
//               sub_district,
//               local_body,
//               village,
//               land_mark,
//             };
//       // console.log('newData',newData);
      
//             setUserData(newData);

//             const { totalFields, nonEmptyFieldCount } = countNonEmptyFields(newData);
            
//             const percentage = (nonEmptyFieldCount / totalFields) * 100;
//             setProfilePercentage(percentage);
//             if (percentage === 100) {
//               // console.log('calling profileCompleted 100');

//               await profileCompleted();
//               // console.log('');
//             }
           
//           } catch (error) {
//             // console.log('error', error);
//           }
//         };
     
//         const countNonEmptyFields = (data) => {
          
//           let totalFields = 0;
//           let nonEmptyFieldCount = 0;
  
//           for (const key in data) {
//             if (data.hasOwnProperty(key)) {
//               totalFields++;
//               if (data[key] !== null && data[key] !== '') {
//                 nonEmptyFieldCount++;
//               }
//             }
//           }
      
//           return { totalFields, nonEmptyFieldCount };
//         };
      
//         fetchData();
//       }, []);
    
      

//       const profileCompleted = async (apiData) => {
//         try {
//           // Make your API call here
//           const response = await axiosInstance.patch('userapp/user/profile/completion/invoice/genetation/if/needed',
      
//           null, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
    
//           // Handle the API response as needed
//           // console.log('API call response', response);
    
//           // Optionally, update state or perform other actions based on the API response
//         } catch (error) {
//           // Handle API call errors
//           // console.error('API call error', error);
//         }
//       };
      

//     // console.log('graph response data', userData);

//     const parsedPercentage = parseInt(profilePercentage, 10);
      
//     const barWidth = `${parsedPercentage === 100 ? 100 : parsedPercentage * 0.8}%`;
//     const transition = parsedPercentage === 100 ? 'none' : 'width 0.5s ease';


//     const handleProfile=()=>{
//       setIsProfileVisible(true)
//     }

//     return (
//         <div>
//             {parsedPercentage < 100 ? (
//                 <>
//                <FontAwesomeIcon color='red' icon={faExclamationTriangle} beat /> <span onClick={handleProfile} style={{cursor:'pointer'}}>Complete your Profile</span> 
//                 </>
  
// ) : (
//   <>
//      <span style={{fontWeight:'600'}}>Profile Completed </span><FontAwesomeIcon color='green' icon={faCircleCheck} fade />
//   </>
// )}

// {parsedPercentage < 100 && (
//       <div
//         style={{
//           width: '100%',
//           height: '25px',
//           backgroundColor: '#536878',
//           borderRadius: '5px',
//           overflow: 'hidden',
//           position: 'relative',
//         }}
//       >
//         <div
//           style={{
//             width: barWidth,
//             height: '100%',
//             backgroundColor: '#081d29',
//             transition: transition,
//           }}
//         >
//           <p
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               color: 'white',
//               fontWeight: '200',
//             }}
//           >
//             {parsedPercentage}%
//           </p>
//         </div>
//       </div>
//     )}
//         </div>
//     );
// };

// export default ProfileStatusChart;










