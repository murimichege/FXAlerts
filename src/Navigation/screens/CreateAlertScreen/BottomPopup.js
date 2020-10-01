import React from 'react'
import { Modal, Dimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const deviceheight = Dimensions.get("window").height
function BottomPopup() {

//hook for show property



const renderOutsideTouchable = (onTouch) => {
    const view = <View/>
    if(!onTouch) return view 
    else 
    return (
        <TouchableOpacity onPress={onTouch} style={{flex: 1, width: '100%'}}>
            {view}
        </TouchableOpacity>
    )
}
const {onTouchOutside, title} = props
    return (
       <Modal
       onRequestClose={close}
       animationType={"fade"}
       transparent={true}
       visible={show}
       >
           <View style={{
               flex: 1, 
               justifyContent: "flex-end", 
               backgroundColor: "#0000000AA"}}
               >
                   {renderOutsideTouchable(onTouchOutside)}
                   <View style={{
                        backgroundColor:"#FFFFFF",
                        width:"100%",
                        borderTopRightRadius:10,
                        borderTopLeftRadius:10,
                        paddingHorizontal:10,
                        maxHeight: deviceheight * 0.4

                   }}
                   >
                       <View>
                           <Text style={{color: "#182E44", fontSize: 20, fontWeight: 500, margin: 15 }}>
                               {title}

                           </Text>
                       </View>

                        
                   </View>

           </View>

       </Modal>
    )
}

export default BottomPopup
