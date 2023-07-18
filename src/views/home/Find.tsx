import React from 'react'
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { IconThumbUpFilled, IconSearch, IconUsers } from "@tabler/icons-react";

const Container = styled('div')({
    marginTop: '0px',
    padding: '86px 182px',
    '@media (max-width: 600px)': {
        padding: '40px 16px',
    },
});

const Part = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: '#2C2C2C',
    borderRadius: '4px',
});

const Circle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    marginBottom: '10px'
});

const Find = () => {
    return (
        <Container style={{ backgroundColor: '#2C2C2C' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Part style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Circle>
                            <IconSearch
                                size={25}
                                strokeWidth={2}
                                color="#0077b5"
                                fill="#0077b5"
                            />
                        </Circle>
                        <Typography
                            variant="h2"
                            sx={{ textDecoration: "none", color: "#fff", marginBottom: '5px', fontSize: '30px', fontWeight: 200 }}
                        >
                            Find contact
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align='center'
                            sx={{ textDecoration: "none", color: "#fff", fontSize: '14px', fontWeight: 100, opacity: 0.7 }}
                        >
                            Find, contact, and close your ideal buyers with over 265M <br /> contacts and streamlined engagement<br /> workflows powered by AI.
                        </Typography>
                    </Part>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Part>
                        <Circle>
                            <IconThumbUpFilled
                                size={25}
                                strokeWidth={2}
                                color="#fff"
                                fill="#0077b5"
                            />
                        </Circle>
                        <Typography
                            variant="h2"
                            sx={{ textDecoration: "none", color: "#fff", marginBottom: '5px', fontSize: '30px', fontWeight: 200 }}
                        >
                            Find contact
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align='center'
                            sx={{ textDecoration: "none", color: "#fff", fontSize: '14px', fontWeight: 100, opacity: 0.7 }}
                        >
                            Find, contact, and close your ideal buyers with over 265M <br /> contacts and streamlined engagement<br /> workflows powered by AI.
                        </Typography>
                    </Part>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Part>
                        <Circle>
                            <IconUsers
                                size={25}
                                strokeWidth={2}
                                color="#0077b5"
                                fill="#0077b5"
                            />
                        </Circle>
                        <Typography
                            variant="h2"
                            sx={{ textDecoration: "none", color: "#fff", marginBottom: '5px', fontSize: '30px', fontWeight: 200 }}
                        >
                            Find contact
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align='center'
                            sx={{ textDecoration: "none", color: "#fff", fontSize: '14px', fontWeight: 100, opacity: 0.7 }}
                        >
                            Find, contact, and close your ideal buyers with over 265M <br /> contacts and streamlined engagement<br /> workflows powered by AI.
                        </Typography>
                    </Part>
                </Grid>
            </Grid>
        </Container >
    );
}

export default Find