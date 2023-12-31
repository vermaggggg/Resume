import React, { Fragment } from 'react'
import { Stack } from 'react-bootstrap'
import { BsLinkedin, BsGithub, BsGlobe } from 'react-icons/bs'
import { GiGraduateCap } from 'react-icons/gi'
import { HiLocationMarker, HiOfficeBuilding, HiOutlineMail, HiPhone } from 'react-icons/hi'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { useSelector } from 'react-redux';

function PdfComponent() {

  const profile = useSelector(state => state.profile)
  const name = profile.name.split(" ");
  const file = useSelector(state => state.file)
  const about = useSelector(state => state.about)
  const experienceList = useSelector(state => state.experienceList)
  const educationList = useSelector(state => state.educationList)
  const skills = useSelector(state => state.skills)


  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    // html2canvas(input)
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF('p', 'pt', 'a4', false);
    //     pdf.addImage(imgData, 'PNG', -100, 0, 500, 0, undefined, false);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("Resume.pdf");
    //   });
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // A4 dimensions in mm
      const pdfPageWidth = 210;
      const pdfPageHeight = 297;

      // Conversion from px to mm
      const canvasWidth = canvas.width * 0.75;
      const canvasHeight = canvas.height * 0.75;

      const widthRatio = pdfPageWidth / canvasWidth;
      const heightRatio = pdfPageHeight / canvasHeight;

      // Calculate ratio to maintain aspect ratio
      const ratio = Math.min(widthRatio, heightRatio);
      const scaledCanvasWidth = canvasWidth * ratio;
      const scaledCanvasHeight = canvasHeight * ratio;

      // Calculate the margins to center the image on the page
      const marginLeft = (pdfPageWidth - scaledCanvasWidth) / 2;
      const marginTop = (pdfPageHeight - scaledCanvasHeight) / 2;

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [pdfPageWidth, pdfPageHeight]
      });

      pdf.addImage(imgData, 'PNG', marginLeft, marginTop, scaledCanvasWidth, scaledCanvasHeight);
      pdf.save("Resume.pdf");
    });

  };

  const GetIcon = (icon) => {
    switch (icon.icon) {
      case "HiOutlineMail":
        return <HiOutlineMail size={20} className="location" />
      case "HiPhone":
        return <HiPhone size={20} className="location" />
      case "BsLinkedin":
        return <BsLinkedin size={20} className="location" />
      case "BsGithub":
        return <BsGithub size={20} className="location" />
      case "BsGlobe":
        return <BsGlobe size={20} className="location" />
      default:
        return "●"
    }
  }
  const GetLinks = () => {
    const list = [];
    if (profile.email) {
      list.push({
        icon: "HiOutlineMail",
        link: profile.email,
      });
    }
    if (profile.contact) {
      list.push({
        icon: "HiPhone",
        link: profile.contact,
      });
    }
    if (profile.linkedin) {
      list.push({
        icon: "BsLinkedin",
        link: profile.linkedin,
      });
    }
    if (profile.github) {
      list.push({
        icon: "BsGithub",
        link: profile.github,
      });
    }
    if (profile.website) {
      list.push({
        icon: "BsGlobe",
        link: profile.website,
      });
    }

    return (

      list.map((item, id) => {
        return (


          <div className={id % 2 === 0 ? "d-flex  align-items-center text-white p-2" : "d-flex  align-items-center  text-white p-2"} key={id}>

            <p className="m-0"><GetIcon icon={item.icon} /></p><span className="mx-2"></span><p className="m-0">{item.link}</p>
          </div>

        )
      })
    )

  }

  return (<>  
    {/* <Fragment>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5499182087357803"
      crossorigin="anonymous"></script>
    <div className="container d-flex justify-content-center p-4">

      <div className="row pdf bg-light" id="divToPrint" size="A4">

        <div className="d-flex align-items-center justify-content-center col-md-5 bg-1 p-0 py-2">
          <div>
            <div className="d-flex justify-content-center">
              <img src={file} className="pdf-profile-image" alt="..."></img>
            </div>

            <Stack className="text-center">
              <span className="font-bold m-0 firstname">{name[0]} {name[1]}</span>

              <p>{profile.tagline}</p>
              <p className="m-0"><HiOfficeBuilding size={20} /> {profile.position}</p>
              <p><HiLocationMarker size={20} /> {profile.location}</p>

            </Stack>

            <GetLinks />


            <Stack className="p-3">
              <h4 className="title">Skills</h4>
              <div className="d-flex flex-wrap">
                {
                  skills.map((items, id) => {
                    return (
                      <p className="technology rounded" key={id}>{items}</p>
                    )
                  })
                }
              </div>
            </Stack>
          </div>

        </div>
        <div className="d-flex align-items-center col-md-7 p-0 py-4">
          <div>
            <div className="px-4 py-1">
              <h4 className="title">About Me</h4>
              <p className="text-break">
                {about}
              </p>
              <hr></hr>
            </div>

            <div className="px-4">
              <h4 className="title">Experience</h4>
              {
                experienceList.map((item, id) => {
                  return (
                    <div className="d-flex justify-content-start py-1" key={id}>
                      <HiOfficeBuilding size={30} />
                      <div className="px-3">
                        <h4>{item.title}</h4>
                        <p className="m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                        <p className="m-0">{item.location}</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  )
                })
              }

              <hr></hr>
            </div>

            <div className="px-4">
              <h4 className="title">Education</h4>
              {
                educationList.map((item, id) => {
                  return (
                    <div className="d-flex justify-content-start py-1" key={id}>
                      <GiGraduateCap size={40} />
                      <div className="px-3">
                        <h4>{item.institute}</h4>
                        <p className="m-0">{item.degree} • {item.fieldOfStudy}</p>
                        <p>{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                      </div>
                    </div>
                  )
                })
              }


            </div>
          </div>

        </div>

      </div>



    </div>
    <div className="preview_btn">
      <button className="nav-link align-middle bg-dark text-white p-2 rounded button" onClick={printDocument}><span>Download</span></button>

    </div>

  </Fragment> */}
    <div className='preview_sec'>
      <div className='coustom_container'>
        <div className='preview_inner'>
          <div className='inner_row' id="divToPrint">

            <div className='left_sec'>
              <div className='img_sec'>
                <img src={file} className="pdf-profile-image" alt="..."></img>
              </div>
              <div className='data_sec'>
                <Stack >
                  <h3 className='location'>Contact</h3>
                  <GetLinks />


                </Stack>
              </div>

            </div>


            <div className='right_sec'>
            <div className='name_sec'>
                    <h1 className="text_black">{name[0]} {name[1]}</h1>
                    <hr/>
                    <p className='text_black'>{profile.tagline}</p>
                  </div>
            <div className='about_me'>
                <h4 className="title">About Me</h4>
                <div className='about_inner'>
                <p className="text-break">
                  {about}
                </p>
                <p className='text_black  position_style'><HiOfficeBuilding size={20} /> {profile.position}</p>
                <p className='text_black  position_style'><HiLocationMarker size={20} /> {profile.location}</p>
                <hr />
                </div>
              </div>

              <div className="education">
                <h4 className="title">Education</h4>
                <div className='edu_inner'></div>
                {
                  educationList.map((item, id) => {
                    return (
                      <div className="d-flex justify-content-start py-1" key={id}>
                        <GiGraduateCap size={40} />
                        <div className="px-3">
                          <h4>{item.institute}</h4>
                          <p className="m-0">{item.degree} • {item.fieldOfStudy}</p>
                          <p className="m-0">{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                        </div>
                      </div>
                    )
                  })
                }

                <hr />
              </div>
              <div className='experience'>
                <h4 className="title">Experience</h4>
                <div className='exp_inner'>
                {
                  experienceList.map((item, id) => {
                    return (
                      <div className="d-flex justify-content-start py-1" key={id}>
                        <HiOfficeBuilding size={30} />
                        <div className="px-3">
                          <h4>{item.title}</h4>
                          <p className="m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                          <p className="m-0">{item.location}</p>
                          <p className="m-0">{item.description}</p>
                        </div>
                      </div>
                    )
                  })
                }
                 </div>
                <hr />
               
              </div>
              <div className='skills'>

                <Stack>
                

                  <h4 className="title">Skills</h4>
                  <div className="skill_inner ">
                    {
                      skills.map((items, id) => {
                        return (
                          <p className=" " key={id}>{items}</p>
                        )
                      })
                    }
                  </div>
                  <hr />
                </Stack>
              </div>
             

             

            </div>

          </div>
        </div>
        <div className="preview_btn">
      <button className="nav-link align-middle bg-dark text-white p-2 rounded button" onClick={printDocument}><span>Download</span></button>

    </div>
      </div>
    </div>
  </>

  )
}

export default PdfComponent