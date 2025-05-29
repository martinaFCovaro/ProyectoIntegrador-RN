import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


import Perfil from '../screens/Perfil';
import Home from "../screens/Home";
import Buscador from '../screens/Buscador'


const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator >
            <Tab.Screen name='Home' component={Home}
            options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}/>
            <Tab.Screen name='Perfil' component={Perfil}
            options={{tabBarIcon: () => <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />}}/>
           <Tab.Screen name= 'Buscador' component={Buscador}/>
        </Tab.Navigator>

    )
}
export default BottomTabs;

