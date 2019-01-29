// import React, { Component, Fragment } from "react";
// import { render } from "react-dom";

// import ReactDropzone from "react-dropzone";

// class FileUpload extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       files: [],
//     };
//   }

//   onPreviewDrop = (files) => {
//     this.setState({
//       files: this.state.files.concat(files),
//      });
//   }

//   render() {
//     const previewStyle = {
//       display: 'inline',
//       width: 100,
//       height: 100,
//     };

//     return (
//       <div className="app">
//         <ReactDropzone
//           accept="image/*"
//           onDrop={this.onPreviewDrop}
//         >
//           Drop an image, get a preview!
//         </ReactDropzone>
//         {this.state.files.length > 0 &&
//           <Fragment>
//             <h3>Previews</h3>
//             {this.state.files.map((file) => (
//               <img
//                 alt="Preview"
//                 key={file.preview}
//                 src={file.preview}
//                 style={previewStyle}
//               />
//             ))}
//           </Fragment>
//         }
//       </div>
//     );
//   }
// }

// export default FileUpload;

import React, {Component} from 'react';
import { Slide } from 'react-slideshow-image';
 
const slideImages = [
  '/Images/Homeimage1.jpeg',
  '/Images/Homeimage2.jpeg',
  'Images/Homeimage3.jpeg'
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,   
  indicators: true,
  arrows: true
}

export default class FileUpload extends Component {
    render() {
        
            return (
              <Slide {...properties}>
                <div className="each-slide">
                  <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                    <span>Slide 1</span>
                  </div>
                </div>
                <div className="each-slide">
                  <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                    <span>Slide 2</span>
                  </div>
                </div>
                <div className="each-slide">
                  <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                    <span>Slide 3</span>
                  </div>
                </div>
              </Slide>
            )
        
    }
}
