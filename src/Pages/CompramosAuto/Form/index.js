import React, { useEffect, useState } from 'react';
import fetchData from 'Api';
import { useForm, Controller } from "react-hook-form";
import { showFieldError,capitalizeFirstLetter,trimAndLowerCase } from 'Components/Forms/Utils';
import { EMAIL_PATTERN } from 'Constants';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useStyles from '../styles';
import { MsgDialog } from 'Components/Dialogs';

const AutoForm = ({compramosAuto}) => {
    const classes = useStyles();
    const { control, errors, handleSubmit } = useForm();
    const [showThaks, setShowThanks] = useState(false);
    const [msgDialog, setMsgDialog] = useState({open:false});

    const onFormSubmit = (data) =>{
        const userData = {...data, name: capitalizeFirstLetter(data.name), email: trimAndLowerCase(data.email) };
        fetchData.post('compramosauto/userData.php',userData).then(rsp => {
            console.log('RSP', rsp);
            if(rsp.sent){
                setShowThanks(true);
            }else{
                setMsgDialog({open:true, title:"ERROR DE ENVÍO!", message: rsp.error, onClose: () =>{
                    setMsgDialog({open:false});
                }})
            }
        })
    }

    useEffect(() => {
        if(showThaks && window.gtag){
            window.gtag('event', 'conversion', {'send_to': 'AW-709105506/2eCNCJv9gasBEOKukNIC'});
        }
    },[showThaks]);

    if(showThaks){
        return (<Paper className={classes.formThanks}>
            <h2>Muchas Gracias</h2>
            <p>Por comunicarte con nosotros.<br/>En breves momentos un asesor se pondrá en contacto contigo.</p>
        </Paper>)
    }

    return (<Box className={classes.form}>
        <h3>{compramosAuto.title}</h3>
        <h5>{compramosAuto.text}</h5>
       <form onSubmit={handleSubmit(onFormSubmit)}>
        	<Controller as={TextField} name="model" label="Modelo:" {...showFieldError(errors.model,{required: "Por favor escriba el modelo de su auto"})} rules={{ required: true}} control={control} defaultValue="" variant="outlined" size="small" />
            <Controller as={TextField} name="year" label="Año:" {...showFieldError(errors.year,{required: "Por favor escriba el año de su auto"})} rules={{ required: true }} control={control} defaultValue="" variant="outlined" size="small" />
            <Controller as={TextField} name="km" label="Kilometraje:" {...showFieldError(errors.km,{required: "Por favor escriba el kilmetraje de su auto"})} rules={{ required: true }} control={control} defaultValue="" variant="outlined" size="small" />
            <Divider />
            <Controller as={TextField} name="name" label="Nombre Completo:" {...showFieldError(errors.name,{required: "Por favor escriba su nombre completo"})} rules={{ required: true}} control={control} defaultValue="" variant="outlined" size="small" />
            <Controller as={TextField} name="phone" label="Teléfono:" {...showFieldError(errors.phone,{required: "Por favor escriba su teléfono"})} rules={{ required: true }} control={control} defaultValue="" variant="outlined" size="small" />
            <Controller as={TextField} name="email" label="Email:" {...showFieldError(errors.email,{required: "Por favor escriba su correo electrónico", pattern: 'Escriba un correo electrónico válido'})} rules={{ required: true, pattern: EMAIL_PATTERN }} control={control} defaultValue="" variant="outlined" size="small" />
            <Divider />
            <Button type="submit" variant="contained" color="primary" disableElevation fullWidth>ENVIAR</Button>
       </form>
       <MsgDialog {...msgDialog} />
    </Box>)
}

export default AutoForm;