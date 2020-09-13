import React, { createRef, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { mediaHost } from 'dash/src/config';
import { getDaysCompleted, getTotalDaysCompleted } from '../../helpers/challenge';

import { BackArrow } from '../../components/Icons';
import Video from '../../components/Video';
import ScheduleRow from '../../components/ScheduleRow';

const TOTAL_DAYS = 30;

function Component(props) {
	const { MyChallenge, user } = props;
	const { plan, challenge, currentDay, dayData } = MyChallenge;

	const daysCompletedArray = getDaysCompleted(user.myStep, challenge);
	const totalDaysCompleted = getTotalDaysCompleted(user.myStep, challenge);

	const progress = `${(totalDaysCompleted / TOTAL_DAYS) * 100}%`;

	const imageURL = `${mediaHost}${plan.planImage}`;

	const [play, setPlay] = useState(false);
	const [load, setLoad] = useState(false);
	const videoRef = createRef(null);

	return (
		<ScrollView style={styles.container}>
			<LinearGradient
				colors={['#E7EEF5', '#fff']}
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 0 }}
				style={styles.overview}
			>
				<Text style={styles.overviewBlueText}>30 Day Plan:</Text>
				<Text style={styles.overviewTitle}>{plan.title}</Text>

				<View style={styles.progressContainer}>
					<View style={styles.progressBar}>
						<View style={[styles.progressCompleted, { width: progress }]} />
					</View>
				</View>

				<Text style={styles.daysCompleted}>
					{totalDaysCompleted} of {TOTAL_DAYS} Days Complete
				</Text>

				<Image
					source={{ uri: imageURL }}
					style={styles.overviewImage}
				/>

				<TouchableOpacity
					style={styles.trailerButton}
					onPress={() => setPlay(true)}
				>
					<FontAwesome
						style={styles.trailerArrow}
						name='play'
						color="#000000"
						size={11}
					/>
					<Text style={styles.trailerText}>Trailer</Text>
				</TouchableOpacity>
			</LinearGradient>

			<TouchableOpacity
				style={styles.backButton}
				onPress={() => Actions.pop()}
			>
				<BackArrow />
			</TouchableOpacity>

			<View style={styles.scheduleContainer}>
				{dayData.map((d, index) => {
					const showSeperator = dayData.length - 1 !== index;
					const showEyebrow = (currentDay - 1) === index;
					const dayComplete = daysCompletedArray[index] === 1;
					const showCircle = (currentDay - 1) > index;
					// TODO: these need to have dates like (Friday Jun 6)
					return (
						<ScheduleRow
							data={d}
							index={index}
							showSeperator={showSeperator}
							showEyebrow={showEyebrow}
							dayComplete={dayComplete}
							showCircle={showCircle}
						/>
					)
				})}
			</View>

			<Video
				play={play}
				load={load}
				item={plan}
				videoRef={videoRef}
				setLoad={setLoad}
				setPlay={setPlay}
			/>
		</ScrollView>
	);
}

export default connect(({ user, MyChallenge }) => ({
	user,
	MyChallenge
}))(Component);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	backButton: {
		height: 40,
		width: 40,
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		position: 'absolute',
		top: 19,
		left: 19,
		justifyContent: 'center',
		alignItems: 'center'
	},
	overview: {
		backgroundColor: 'lightblue',
		height: 469,
		paddingTop: 96,
		paddingHorizontal: 40,
		justifyContent: 'flex-end'
	},
	overviewBlueText: {
		fontFamily: 'Poppins-Bold',
		fontSize: 12,
		lineHeight: 16,
		textAlign: 'center',
		letterSpacing: 1.6,
		textTransform: 'uppercase',
		color: '#1AA0FF',
		paddingBottom: 4
	},
	overviewTitle: {
		fontFamily: 'Poppins-Bold',
		fontSize: 24,
		lineHeight: 32,
		textAlign: 'center',
		color: '#21293D',
		paddingBottom: 20
	},
	progressContainer: {
		marginHorizontal: 21
	},
	progressBar: {
		width: '100%',
		height: 4,
		backgroundColor: '#E0EAF3',
		borderRadius: 2,
		marginBottom: 17,
	},
	progressCompleted: {
		backgroundColor: '#1AA0FF',
		borderRadius: 2,
		height: 4
	},
	daysCompleted: {
		fontFamily: 'Poppins-Medium',
		fontSize: 12,
		lineHeight: 20,
		textAlign: 'center',
		color: '#1AA0FF',
		marginBottom: 12
	},
	overviewImage: {
		height: 240,
		width: 240,
		alignSelf: 'center'
	},
	trailerButton: {
		width: 117,
		height: 40,
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#E0EAF3',
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		position: 'absolute',
		bottom: 25
	},
	trailerText: {
		fontFamily: 'Poppins-Bold',
		fontSize: 10,
		lineHeight: 16,
		letterSpacing: 2,
		textTransform: 'uppercase',
		color: '#3F434F'
	},
	trailerArrow: {
		paddingRight: 8
	},
	scheduleContainer: {
		marginHorizontal: 16
	}
});
