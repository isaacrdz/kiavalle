import React from 'react';
import PageWrapper from 'Components/PageWrapper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AutoForm from './Form';
import { Room } from '@material-ui/icons';
import useStyles from './styles';

const GoogleMap = ({src,classes}) => {
    return (<iframe src={src} frameBorder="0" className={classes.map} aria-hidden="false" tabIndex="0"></iframe>)
}

const CompramosAutoPage = ({state}) => {
    console.log(state)
    const classes = useStyles();
    return (<PageWrapper>
        <Container maxWidth="lg">
            <img className={classes.banner} src={`/assets/images/banners/${state.compramosAuto.banner}.jpg`} alt="Compramos Auto" />
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <AutoForm compramosAuto={state.compramosAuto} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <h3>Nuestra ubicación</h3>
                    <Box display="flex" alignContent="center">
                        <Room /> <p>{state.compramosAuto.address}</p>
                    </Box>
                    <GoogleMap src={state.compramosAuto.map} classes={classes} />
                </Grid>
            </Grid>
        </Container>
    </PageWrapper>);
}

export default CompramosAutoPage;