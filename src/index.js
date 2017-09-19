// eslint-disable-next-line
import React, { Component } from 'react';
import { render } from 'react-dom';
import Slider from 'react-slick';
import axios from 'axios';
import { debounce } from 'lodash';
import { NextArrow, PrevArrow } from './components/arrows';
import SearchBar from './components/searchbar';
import { BASE_URL, PHOTO_INFO_URL } from './config';
import './style.css';

async function getPhoto(id) {
  const res = await axios.get(`${PHOTO_INFO_URL}&photo_id=${id}`);
  const { size } = res.data.sizes;
  return size;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      term: 'fish',
      processing: false,
    };
  }

  componentWillMount() {
    this.getPhotos(this.state.term);
  }

  async getPhotos(term) {
    try {
      const res = await axios.get(`${BASE_URL}&text=${term}`);
      const { photo } = res.data.photos;
      const photos = await Promise.all(photo.map(s => getPhoto(s.id),
      ));
      this.setState({ photos, processing: false });
    } catch (e) {
      console.log(e);
    }
  }

  photoSearch(term) {
    this.setState({ processing: true });
    this.getPhotos(term);
  }

  render() {
    if (!this.state.photos) {
      return <div>loading...</div>;
    }

    const slides = this.state.photos.map((page) => {
      const mediumSized = page.filter(f => f.label === 'Medium');
      return mediumSized[0];
    });


    const settings = {
      customPaging: (i) => {
        const page = this.state.photos[i];

        const squareSized = page.filter(f => f.label === 'Square');

        return <a><img src={squareSized[0].source} alt="" /></a>;
      },
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    const photoSearch = debounce((term) => {
      this.photoSearch(term);
    }, 500);


    return (
      <div>
        {this.state.processing &&
          <span className="status">Searching flickr for {this.state.term} photos...</span>}

        <SearchBar onSearchTermChange={photoSearch} />
        <Slider {...settings}>
          {slides.map((page, k) => <div key={k}><img src={page.source} alt="" /></div>)}
        </Slider>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
