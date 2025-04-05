import React from 'react';
import { BookSaved, Calendar, Messages, VolumeMute, Call } from 'iconsax-react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.bottomNav}>

        {/* schedule-tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('schedule')}>
          <Calendar
            variant={activeTab === 'schedule' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'schedule' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>

        {/* chats tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('chats')}>
          <Messages
            variant={activeTab === 'chats' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'chats' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>

        {/* batches tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('batches')}>
          <BookSaved
            variant={activeTab === 'batches' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'batches' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>

        {/* highlights tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('highlights')}>
          <VolumeMute
            variant={activeTab === 'highlights' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'highlights' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>

        {/* calls tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('calls')}>
          <Call
            variant={activeTab === 'calls' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'calls' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 20,
    height: 65,
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    paddingVertical: 10,
  },
});

export default BottomNav;
