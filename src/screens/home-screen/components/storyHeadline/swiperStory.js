import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { Button } from 'react-native-ui-kitten/ui'
import Icon from 'react-native-vector-icons/FontAwesome5'

const SwiperStory = (props) => {
    const {article, articles} = props
    const SingleStory = ({myArticle}) => {
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={props.onCloseStory}
                >
                    <Icon name="times" color='#fff' size={25}/>
                </TouchableOpacity>
                <Image
                    source={{uri: myArticle.imageLink}}
                    style={styles.storyImage}
                />
                <Text style={styles.storyText}>
                    {myArticle.title}
                </Text>
                <Text style={styles.shortDescription}>
                    {myArticle.shortDescription ? myArticle.shortDescription.substring(0, 200) + '...' : ''}
                </Text>
                <Button style={styles.readMoreButton} onPress={()=>props.showArticleDetail(myArticle)}>
					READ MORE
				</Button>
            </View>
        )  
    }

    const getArticleIndex = () => {
        let myArticle = articles.filter(x=>x.title == article.title)[0]
        return articles.indexOf(myArticle)
    }

    return (
        <Swiper 
            showsButtons={true} 
            autoplay={true}
            loop={false}
            showsPagination={false}
            autoplayTimeout={5}
            index={getArticleIndex()}
            onIndexChanged={(i)=>props.onStorySwiped(articles[i])}
            removeClippedSubviews={false}
            scrollEnabled={true}
        >
            {articles.map((singleArticle,i)=>(
                <SingleStory
                    key={i}
                    myArticle={singleArticle}
                />
            ))}
        </Swiper>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)'
    },
    storyImage: {
        height: 250,
        width: '100%',
        resizeMode: 'stretch'
    },
    storyText: {
        fontSize: 22,
        marginTop: 20,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.9
    },
    shortDescription: {
        fontSize: 16,
        marginTop: 12,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.8
    },
    readMoreButton: {
        marginTop: 40,
        width: 200
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 111,
        elevation: 1,
        backgroundColor: '#000',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    }
})

export default SwiperStory
