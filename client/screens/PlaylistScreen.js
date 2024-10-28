import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const playlist = {
  coverImage: 'https://example.com/cover.jpg',
  title: 'Your personalized Playlist',
  songs: [
    { id: 1, title: 'Song 1', artist: 'Artist 1', albumCover: 'https://example.com/album1.jpg' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', albumCover: 'https://example.com/album2.jpg' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', albumCover: 'https://example.com/album3.jpg' },
    // Add more song data here
  ],
};

const SongCard = ({ song }) => (
  <View style={styles.songCard}>
    <Image source={{ uri: song.albumCover }} style={styles.albumCover} />
    <View style={styles.songInfo}>
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.songArtist}>{song.artist}</Text>
    </View>
    <Icon name="ellipsis-horizontal" size={24} color="#fff" />
  </View>
);

const PlaylistScreen = () => {
  const handlePlayPress = () => {
    console.log('Play Playlist');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: playlist.coverImage }} style={styles.coverImage} />
      <Text style={styles.playlistTitle}>{playlist.title}</Text>
      <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
        <Icon name="play-circle" size={48} color="#1E90FF" />
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>

      <FlatList
        data={playlist.songs}
        renderItem={({ item }) => <SongCard song={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.songList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  coverImage: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  playButtonText: {
    color: '#1E90FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  songList: {
    paddingHorizontal: 16,
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
  },
  songArtist: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default PlaylistScreen;