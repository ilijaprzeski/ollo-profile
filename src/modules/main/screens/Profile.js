import React from 'react';
import { Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native';
import Toast from 'react-native-simple-toast'
import ImagePicker from 'react-native-image-crop-picker'
import ActionSheet from 'react-native-actionsheet'
import SortableGrid from '../../../components/SortableGrid'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'

class ProfileImage extends React.Component {
    render() {
        return (
            <View>
                <View style={{width: '100%', paddingRight: 10, paddingBottom: 10}}>
                    <Image source={{uri: this.props.imagePath}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                </View>
                <View style={{position: 'absolute', right: 5, bottom: 5}}>
                    <TouchableOpacity onPress={() => this.props.onRemove()}>
                        <Image source={require('../../../../assets/images/icons/ic_delete.png')} style={{width: 20, height: 20}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class EmptyImage extends React.Component {
    render () {
        return (
            <View>
                <View style={{width: '100%', paddingRight: 10, paddingBottom: 10}}>
                    <View style={{width: '100%', height: '100%', borderRadius: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.props.onNew()}>
                            <Image source={require('../../../../assets/images/icons/ic_plus.png')} style={{width: 20, height: 20}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    constructor() {
        super()
        this.state = {
            pageName: 'select',
            images: [],
            refresh: 0,
            uploading: false
        }

        this.imageWidth = 300
        this.imageHeight = 300
        this.changeIndex = -1
        this.images = []
        this.imagesOrder = []
        this.itemsPerRow = 3;
        this.userID = ''
    }

    performTimeConsumingTask = async() => {
        return new Promise((resolve)=>
            setTimeout(() => { resolve('result') }, 2000)
        )
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if(data != null) {
			try {
				firebase.auth().onAuthStateChanged(user => {
					if(user === null) {
						Toast.show('no signed user')
					} else {
						this.userID = user.uid
					}
				})
			} catch(error) {
				Toast.show(error.toString())
			}
        }
    }

    onNext(){
        if(this.state.images.length === 0){
            Toast.show("Please add a profile image at least");
            return ;
        }

        let len = this.state.images.length
        let total = (len % this.itemsPerRow === 0 ? (len / this.itemsPerRow + 1) : (Math.floor(len / this.itemsPerRow) + 2)) * this.itemsPerRow
        let empty = total - len
        for(i = 0; i < empty; i++){
            this.images.push({type: 'empty'})
        }

        this.setState({pageName: 'reorder', images: this.images})
        this.imagesOrder = []
        for(var i = 0; i < this.images.length; i++){
            this.imagesOrder.push({key: i.toString(), ref: null, order: i})
        }
    }
    
    reorderImages(){
        let newArray = []
        for(i = 0; i < this.imagesOrder.length; i++){
            let index = parseInt(this.imagesOrder[i].key, 10)
            if(this.images[index].type === 'empty'){}
            else {
                newArray.push(this.images[index])
            }
        }
        for(i = newArray.length; i < this.images.length; i++){
            newArray.push({type: 'empty'})
        }
        this.images = [...newArray]

        this.imagesOrder = []
        for(var i = 0; i < this.images.length; i++){
            this.imagesOrder.push({key: i.toString(), ref: null, order: i})
        }
    }

    async onDone(){
        // todo: upload images here.
        if(this.userID === '') {
            Toast.show('There is no signed user.')
        } else {
            this.setState({uploading: true})
            this.reorderImages()
            // firebase.storage().ref().child('users/' + this.userID).delete();
            for(i = 0; i < this.images.length; i++){
                if(this.images[i].type === 'empty'){}
                else {
                    if( i === 0) {
                        await firebase.storage().ref().child('users/' + this.userID + '/' + this.userID + '.jpg').putFile(this.images[i].path)
                    } else {
                        await firebase.storage().ref().child('users/' + this.userID + '/others/' + i.toString() + '.jpg').putFile(this.images[i].path)
                    }
                }
            }
            this.setState({uploading: false})
        }
        //////////////////////

        this.images = []
        this.setState({pageName: 'select', images: []})
        ImagePicker.clean().then(() => {

        }).catch((error) => {
            Toast.show(error.toString())
        })
    }

    addImagefromLibrary(position){
        ImagePicker.openPicker({
            width: this.imageWidth,
            height: this.imageHeight,
            cropping: true
        }).then(image => {
            this.setState({images: []})
            if (position === -1)
                this.images.push(image)
            else {
                this.images.splice(position, 1, image)
                if(this.state.pageName === 'reorder')
                    this.reorderImages()
            }
            this.setState({images: this.images})
        }).catch(error => {
            Toast.show(error.toString())
        });
    }

    addImagefromCamera(position){
        ImagePicker.openCamera({
            width: this.imageWidth,
            height: this.imageHeight,
            cropping: true
        }).then(image => {
            this.setState({images: []})
            if (position === -1)
                this.images.push(image)
            else {
                this.images.splice(position, 1, image)
                if(this.state.pageName === 'reorder')
                    this.reorderImages()
            }
            this.setState({images: this.images})
        }).catch(error => {
            Toast.show(error.toString())
        });
    }

    addImagefromFacebook(position){}

    onAddImage(index, position){
        if(index == 0){
            this.addImagefromFacebook(position)
        } else if(index == 1){
            this.addImagefromCamera(position)
        } else if(index == 2){
            this.addImagefromLibrary(position)
        }
    }

    getImageOrder(itemOrder) {
        this.imagesOrder = [...itemOrder]
    }

    removePicture(){
        this.setState({images: []})
        var num = 0;
        this.images.forEach(element => {
            if(element.type === 'empty'){}
            else {
                num += 1
            }
        });

        if(num === 1){
            Alert.alert( 'Ollo', 'Primary picture should be exist.', [{text: 'OK'}] );
            this.setState({images: this.images})
            return ;
        } else {
            this.images.splice(this.deleteIndex, 1, {type: 'empty'})
            // this.images.push({type: 'empty'})
            this.reorderImages()
            this.setState({images: this.images})
        }
    }

    render() {

        // screen for image inserting
        if (this.state.pageName === 'select'){
            return (
                <View style={{flex: 1, backgroundColor: '#f4f4f4', padding: 20}}>
                    <View style={{ flex: 1, paddingTop: 20}}>
                        <Text style={{color: '#555555', fontSize: 18, fontWeight: 'bold'}}>Your Picture</Text>
                        {
                            this.state.images.length === 0 ? (
                                <View style={{backgroundColor: 'white', borderRadius: 5, height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                                    <TouchableOpacity onPress={() => {
                                        this.changeIndex = -1
                                        this.ActionSheet.show()
                                    }}>
                                        <View style={{backgroundColor: '#45c6ff', width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: 'white', fontSize: 30, opacity: 0.9}}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 5}}>
                                    <Image source={{uri: this.state.images[0].path}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                                    <View style={{position: 'absolute', right: 0, bottom: 0}}>
                                        <TouchableOpacity onPress={() => {
                                            this.changeIndex = 0
                                            this.ActionSheet.show()
                                        }}>
                                            <Image source={require('../../../../assets/images/icons/ic_pencil.png')} style={{width: 20, height: 20}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                        <View style={{alignItems: 'center', paddingBottom: 30}}>
                            <Text onPress={() => {this.onNext()}} style={{color: '#6f6f6f', fontSize: 16, textDecorationLine: 'underline', marginTop: 20}}>Add more</Text>
                        </View>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Select Photo'}
                            options={['Import from Facebook', 'Take Photo', 'Choose from Library', 'Cancel']}
                            cancelButtonIndex={3}
                            onPress={(index) => this.onAddImage(index, this.changeIndex)} />
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                        <Button onPress={() => {}} title="Next" color="#00a9de" style={{borderRadius: 10}} />
                    </View>
                </View>
            );
        }

        //screen for reorder
        if (this.state.pageName === 'reorder'){
            return (
                <View style={{flex: 1, backgroundColor: '#f4f4f4', paddingVertical: 20, paddingLeft: 20, paddinRight: 20}}>
                    <Spinner visible={this.state.uploading} textContent={'Uploading...'} textStyle={{color: '#FFF'}} />
                    <View style={{ flex: 1, paddingTop: 20}}>
                        <Text style={{color: '#555555', fontSize: 18, fontWeight: 'bold'}}>Your Pictures</Text>
                        <SortableGrid 
                            style={{marginTop: 10}}
                            itemsPerRow={this.itemsPerRow}
                            dragActivationTreshold={100}
                            itemHeight={150}
                            onDragRelease={(order) => this.getImageOrder(order.itemOrder)}>
                        {
                            this.state.images.map((image, index)=> {
                                return (
                                    image.type === 'empty' ? (
                                        <EmptyImage key={index} inactive={true} onNew={() => {
                                            this.changeIndex = index
                                            this.ActionSheet.show()
                                        }} />
                                    ) : (
                                        <ProfileImage key={index} inactive={false} imagePath={image.path} onEdit={() => {
                                            this.changeIndex = index
                                            this.ActionSheet.show()
                                        }} onRemove={() => {
                                            this.deleteIndex = index
                                            Alert.alert(
                                                'Ollo',
                                                'Do you really delete this picture?',
                                                [
                                                    {
                                                        text: 'Cancel',
                                                        style: 'cancel',
                                                    },
                                                    {text: 'OK', onPress: () => this.removePicture()}
                                                ]
                                            )
                                        }}/>
                                    )
                                )
                            })
                        }
                        </SortableGrid>
                        <Text style={{color: 'gray', fontSize: 16, marginTop: 20}}>Drag to reorder photos</Text>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Select Photo'}
                            options={['Import from Facebook', 'Take Photo', 'Choose from Library', 'Cancel']}
                            cancelButtonIndex={3}
                            onPress={(index) => this.onAddImage(index, this.changeIndex)} />
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 40}}>
                        <Button onPress={() => this.onDone()} title="Done" color="#00a9de" style={{borderRadius: 10}} />
                    </View>
                </View>
            )
        }

        return (
            <View></View>
        )
    }
}