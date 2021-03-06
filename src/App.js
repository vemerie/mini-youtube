import React from 'react';
import youtube from './api/youtube'; 
import { SearchBar, VideoList, VideoDetail } from './components';


import { Grid } from '@material-ui/core';

class App extends React.Component {

  state = {
    videos: [],
    selectedVideo: null,
  }
  
handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: process.env.REACT_APP_API_KEY,
        q: searchTerm,
      }
    });

    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }

  onVideoSelect = (video) => {
   this.setState({ selectedVideo: video });
 }

	render() {
        const { selectedVideo, videos } = this.state;
        console.log(selectedVideo)
      return (
        <Grid style={{ justifyContent: 'center' }} container spacing={10}>
          <Grid item xs={11}>
            <Grid container spacing={10}>
              <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
              </Grid>
              <Grid item xs={8}>
                 <VideoDetail video={selectedVideo} />
              </Grid>
              <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
}

export default App;