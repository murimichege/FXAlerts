import React, { useState } from 'react'
import { Modal, Text, View, Button } from 'react-native'

function CreateAlertModal() {

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal({
      modal: !modal ?true : false
    })
  }

  return (
    <View style={{width: "100%"}}>
     <Button title="Open Modal" onPress={() => handleModal()}/>
     <Modal
     visible={modal}
     animationType={"fade"}
     onPress={() => alert("Modal active")}     
     >
       <View style={{marginTop: 50, backgroundColor: "grey"}}>
         <Text>
           My modal
         </Text>
       </View>
       <Button title="Close modal" onPress={() => handleModal()}/>
     </Modal>
    </View>
  )
}
export default CreateAlertModal
