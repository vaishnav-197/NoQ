import React, {useContext, useEffect, useRef, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import {Link} from 'react-router-dom'
import './scan.css';
import QrReader from 'modern-react-qr-reader';

function Scan() {
    const state = useContext(GlobalState)

    
const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }

    
    return (
        <div className="scan-page">
            <h2>Scan</h2>

            <Grid container spacing={2}>
                     
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Upload Qr Code</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />

                        { scanResultFile ? (<Link to={`/detail/${scanResultFile}`}>
                    Scan success! Click here to goto product page
                    </Link>) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12} style={{margin: 'auto'}}>
                         <QrReader
                         facingMode={"environment"}
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         { scanResultWebCam ? (<Link to={`/detail/${scanResultWebCam}`}>
                    Scan success! Click here to goto product page
                    </Link>) : null}
                      </Grid>
                  </Grid>

            
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));

export default Scan