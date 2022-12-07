import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// utils
import mockData from '../../utils/mock-data';
//
import { varFadeInRight, MotionContainer } from '../../components/animate';

// material
import { Container, Grid } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
// components
import Page from '../../components/Page';
import PropTypes from 'prop-types';
import AppEventWelcome from 'src/components/_dashboard/general-app/AppEventWelcome';
import { CardContent, Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function GeneralEvent({}) {
  const theme = useTheme();

  const eventNumber = useParams().id;   //definido en routes
  console.log(eventNumber);

  const TITLES = ['Feria del Libro en La Bañeza', 'Crankdat Set on Columbus', 'Lightroom mobile - Koloro', 'Pixel Terror on Armellada'];
  
  const MOCK_APPS = [...Array(4)].map((_, index) => ({
    id: mockData.id(index),
    title: TITLES[index],
    description: TITLES[index], // mockData.text.title(index),
    image: mockData.image.feed(index)
  }));

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? MOCK_APPS.length - 1 : 0);
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  

  

  const CarouselImgStyle = styled('img')(({ theme }) => ({
    height: 280,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.up('xl')]: {
      height: 320
    }
  }));

  CarouselItem.propTypes = {
    item: PropTypes.object,
    isActive: PropTypes.bool
  };

  function CarouselItem({ item, isActive }) {
    const { image, title, description } = item;
  
    return (
      <RouterLink to="#">
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              top: 0,
              width: 1,
              height: 1,
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.62)
            }}
          />
          <CarouselImgStyle alt={title} src={image} />
          <CardContent
            sx={{
              bottom: 0,
              width: 1,
              textAlign: 'left',
              position: 'absolute',
              color: 'common.white'
            }}
          >
            <MotionContainer open={isActive}>
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="overline"
                  sx={{
                    mb: 1,
                    opacity: 0.48,
                    display: 'block'
                  }}
                >
                  Events
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography variant="h5" gutterBottom noWrap>
                  {title}
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography variant="body2" noWrap>
                  {description}
                </Typography>
              </motion.div>
            </MotionContainer>
          </CardContent>
        </Box>
      </RouterLink>
    );
  }


  return (
    
    <Page title="EventMag | Event Manager">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppEventWelcome displayName={user.displayName} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Card>
              <CarouselItem key={MOCK_APPS[eventNumber].id} item={MOCK_APPS[eventNumber]} isActive={true} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
