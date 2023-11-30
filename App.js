import React, { useEffect } from 'react';
import { StatusBar, TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';
import mqtt from 'mqtt';
import { TextInput } from 'react-native-web';

export default function App() {
  useEffect(() => {
    // Kết nối tới Adafruit IO khi component được render lần đầu
    const client = mqtt.connect('mqtt://lehoang1479hn:aio_cJyK13rdkZKezYCvLHOlSxBMnPev@io.adafruit.com', {
      port: 1883,
      username: 'lehoang1479hn',
      password: 'aio_cJyK13rdkZKezYCvLHOlSxBMnPev'
    });

    // Xử lý sự kiện kết nối thành công
    client.on('connect', () => {
      console.log('Connected to Adafruit IO');
    });

    // Giải phóng kết nối khi component bị huỷ
    return () => {
      client.end();
    };
  }, []);

  // Hàm gửi dữ liệu lên Adafruit IO
  const publishData = (value) => {
    const client = mqtt.connect('mqtt://lehoang1479hn:aio_cJyK13rdkZKezYCvLHOlSxBMnPev@io.adafruit.com', {
      port: 1883,
      username: 'lehoang1479hn',
      password: 'aio_cJyK13rdkZKezYCvLHOlSxBMnPev'
    });

    // Xử lý sự kiện kết nối thành công
    client.on('connect', () => {
      console.log('Connected to Adafruit IO');
      
      // Gửi dữ liệu lên feeds 'lehoang1479hn/feeds/Androi'
      client.publish('lehoang1479hn/feeds/Androi', value);
      
      // Đặt giá trị status tương ứng với dữ liệu gửi
      const topic = 'lehoang1479hn/feeds/Androi';
      const statusValue = (value === 'Light') ? 'on' : 'off';
      client.publish(topic, statusValue);

      // Đóng kết nối MQTT
      client.end();
    });
  };

  // Render giao diện của ứng dụng
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.opheader}>
          <TextInput value='27%' style={styles.opheader1} ></TextInput>
          <TextInput value= '60%' style={styles.opheader1}></TextInput>


        </View>
        <TouchableOpacity style={[styles.button, { width: 200, height: 50 }]} onPress={() => publishData('Light')}>
          <Text style={styles.buttonText}>Light</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { width: 200, height: 50 }]} onPress={() => publishData('Dark')}>
          <Text style={styles.buttonText}>Dark</Text>
        </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>MQTT Connection</Text>
      </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34abeb',
  },
  header: {
    border:1,
    marginTop:40,
    backgroundColor: '#34abeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opheader:{
    flexDirection:'row',
    marginBottom:50,
    

  },
  opheader1:{
    height:40,
    backgroundColor: '#fc7f03',
    width:150,
    marginLeft:10,
    padding:10,
    
  },

  headerText: {
    fontSize: 24,
    color:'#ffff'
  },
  content: {
    marginTop: 50,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    
    marginBottom:20,
    backgroundColor: '#fc7f03',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});