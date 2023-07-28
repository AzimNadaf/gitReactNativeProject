import React, { useState,useEffect } from 'react';
import {
  AppRegistry,View
} from 'react-native';
import SegmentComponent from './SegmentComponent';
import styles from './ComponentStyles';
import CalendarComponent from './CalendarComponent';
import ArrowButton from './ArrowButton';
import ListComponent from './ListComponent';
import MyModule from './MyModule'; 

const GraphPage = () => {


  const url="http://192.168.2.55:3000";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leftArrowButtonHidden, setLeftArrowButtonHidden] = useState(false);
  const [rightArrowButtonHidden, setRightArrowButtonHidden] = useState(false);
  const [regDate, setRegDate] = useState(new Date(2023, 2, 23));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSegment, setSelectedSegment] = useState(0);
  const dataFor = "Heart rate"
  const [receivedData, setReceivedData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [isFirstTimeLoaded, setIsFirstTimeLoaded] = useState(false);

  const handleNavigationStateChange = event => {
    if (event.loading) {
      return;
    }
    setWebViewHeight(event.jsEvaluationValue);
  };

  const leftBtnPressed = () => {
    const previousDate = subtractOneDay(selectedDate);
    setSelectedDate(previousDate);
    console.log('leftBtnPressed!' + previousDate);
  };
  

  const rightBtnPressed = () => {
    const nextDate = addOneDay(selectedDate);
    setSelectedDate(nextDate);
    console.log('rightBtnPressed!' + nextDate);
  };

  const setButtonState= () =>{
    setLeftArrowButton()
    setRightArrowButton() 
  }

  const setLeftArrowButton = () => {
    if(compareDates(regDate,selectedDate)){
      setLeftArrowButtonHidden(false);
    }else{
       setLeftArrowButtonHidden(true);
    }
  }

  const setRightArrowButton = () => {
    if(compareDates(selectedDate,currentDate)){
      setRightArrowButtonHidden(false);
    }else{
      setRightArrowButtonHidden(true);
    }
  }
  const onButtonPress = (value) => {
    setSelectedDate(value)
    console.log('selectedDate onButtonPress!' + value);

    // MyModule.myNativeMethod('Data from JavaScript to iOS!');
  };

  const onSegmentSelect = (value) => {
    console.log('onSegmentSelect = ' + value);
    setSelectedSegment(value)
  }

  const compareDates = (dateString1, dateString2) => {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
  
    // Set hours, minutes, seconds, and milliseconds to zero
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
  
    //console.log('date1 = ' + date1 + ' date2 = ' + date2);
    
    if (date1.getTime() < date2.getTime()) {
      return true;
    } else {
      return false;
    }
  };

  const subtractOneDay = (date) => {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    return previousDate;
  };

  const addOneDay = (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  };

  const fetchDataFromNative = () => {
    
    // const weekStart = getWeekStart(selectedDate);
    // console.log('getWeekStart!' + weekStart);
    // const { startDate, endDate } = getWeekRange(weekStart);
    // console.log('getWeekRange!' + startDate + endDate );
    // console.log('addDaysInDate = ' + addDaysInDate(startDate,-7))

    // console.log('getMonthStart = ' + getMonthStart(selectedDate));
    // console.log('addMonthInDate = ' + addMonthInDate(selectedDate,-1));

    // console.log('getYearStart = ' + getYearStart(selectedDate));
    // console.log('addYearsToDate = ' + addYearsToDate(getYearStart(selectedDate),1));

    // console.log('fetchDataFromNative onSegmentSelect = ' + selectedSegment);


    console.log('fetchDataFromNative selectedDate = ' + selectedDate);

  

    const tempType = getSegmentType(selectedSegment);
    const tempDate = formatDate(selectedDate)

    const fai = {
      dataFor: dataFor,
      type: tempType,
      date: tempDate,
    };

    console.log('fai values = ' + fai)

    MyModule.callApi('store/fetch_store_home_components?', fai)
    .then((response) => {
      console.log('API call Data', response);

     // this.setState({ cardsArray: response.data.cards, loading: false })
     setReceivedData(response)
    })
    .catch((error) => {
      console.log('API call failed: ', error);
    });
  };

  const getWeekStart = (date) => {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
  
    const weekStart = new Date(date);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0); 
  
    return weekStart;
  };

  const getWeekRange = (date) => {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(startDate.getDate() + 6);
    return { startDate, endDate };
  };

  const addDaysInDate = (date,days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const getMonthStart = (date) => {
    const monthStart = new Date(date);
    monthStart.setDate(1); 
    monthStart.setHours(0, 0, 0, 0); 
  
    return monthStart;
  };

  const addMonthInDate = (date, month) => {
    const newDate = new Date(date); 
    newDate.setMonth(newDate.getMonth() + month);
    return newDate;
  };

  const getYearStart = (date) => {
    const yearStart = new Date(date);
    yearStart.setFullYear(date.getFullYear(), 0, 1); // Set the year, month (0 for January), and date to January 1st
    yearStart.setHours(0, 0, 0, 0); 
  
    return yearStart;
  };

  const addYearsToDate = (date, years) => {
    const newDate = new Date(date); 
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
  
    return `${year}-${month}-${day}`;
  };

  const getSegmentType = (index) =>{

    if(index == 0){
      return "daily";
    }else if(index == 1){
      return "weekly";
    }else if(index == 2){
      return "monthly";
    }else if(index == 3){
      return "yearly";
    }

    return 'daily';
  }
  
  useEffect(() => {
    console.log('useEffect index')
     setButtonState();
     fetchDataFromNative();

     if(!isFirstTimeLoaded){
      setTimeout(() => {
        setIsFirstTimeLoaded(true)
        fetchDataFromNative();
      }, 1000);
     }


  }, [selectedDate]);

  useEffect(() => {
    console.log('useEffect receivedData index')
    // setIsDataLoaded(prevState => !prevState);
  }, [receivedData]);

  return (

<View style={styles.container}>
      <SegmentComponent onButtonPress={onSegmentSelect}/>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', marginVertical: 20, height: 'auto' }}>
          <ArrowButton direction="left" enabled={!leftArrowButtonHidden} onPress={leftBtnPressed} />
        </View>
        <View style={{ width: 200, height: 'auto' }}>
          <CalendarComponent key={selectedDate} onButtonPress={onButtonPress} date={selectedDate} minDate={regDate} />
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 20, height: 'auto' }}>
          <ArrowButton direction={'right'} enabled={!rightArrowButtonHidden} onPress={rightBtnPressed} />
        </View>
      </View>
        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 20 }}>
          <ListComponent key={isDataLoaded} receivedData={receivedData} />
        </View>
    </View>
  );
};



AppRegistry.registerComponent(
  'myapp',
  () => GraphPage
);
