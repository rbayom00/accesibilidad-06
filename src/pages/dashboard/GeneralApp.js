import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
// components
import Page from '../../components/Page';
import PropTypes from 'prop-types';
import { AppWelcome, AppFeatured } from '../../components/_dashboard/general-app';
import { CardContent, Button, Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const navigate = useNavigate();

  const theme = useTheme();

  const TITLES = [
    'Feria del Libro en La Bañeza',
    'Crankdat Set on Columbus',
    'Lightroom mobile - Koloro',
    'Pixel Terror on Armellada',
    'Gala Internacional: Los Mejores Magos del Mundo'
  ];

  const MOCK_APPS = [...Array(5)].map((_, index) => ({
    id: mockData.id(index),
    title: TITLES[index],
    description: TITLES[index],
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
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
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
                  Event
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
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user.displayName} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CarouselItem
                onClick={() => {
                  navigate('/dashboard/app/event/0');
                }}
                key={MOCK_APPS[0].id}
                item={MOCK_APPS[0]}
                isActive={true}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CarouselItem
                onClick={() => {
                  navigate('/dashboard/app/event/1');
                }}
                key={MOCK_APPS[1].id}
                item={MOCK_APPS[1]}
                isActive={true}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CarouselItem
                onClick={() => {
                  navigate('/dashboard/app/event/4');
                }}
                key={MOCK_APPS[4].id}
                item={MOCK_APPS[4]}
                isActive={true}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CarouselItem
                onClick={() => {
                  navigate('/dashboard/app/event/2');
                }}
                key={MOCK_APPS[2].id}
                item={MOCK_APPS[2]}
                isActive={true}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CarouselItem
                onClick={() => {
                  navigate('/dashboard/app/event/3');
                }}
                key={MOCK_APPS[3].id}
                item={MOCK_APPS[3]}
                isActive={true}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CarouselItem
                onClick={() => {
                  navigate('/dashboard/app/event/0');
                }}
                key={MOCK_APPS[0].id}
                item={MOCK_APPS[0]}
                isActive={true}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
