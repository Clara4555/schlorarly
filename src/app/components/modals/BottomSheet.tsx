import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import React, { forwardRef, ReactNode, Ref, useImperativeHandle, useState } from 'react'
import BottomSheetRefType from './BottomSheetRefType';
import Animated, { FadeIn, FadeInUp, FadeOut, runOnJS, SlideInDown, SlideInUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';
import { Gesture, GestureDetector, Pressable } from 'react-native-gesture-handler';
import AnimatedPressable from '../buttons/AnimatedPressable';




type BottomSheetProps<T> = {
    children: ReactNode,
    className?: string,
    style?: StyleProp<ViewStyle>,
    bounceOffset?: number,
    /**
     * What type of animation play when the bottom sheet is entering or exiting
     */
    navigationAnim?: 'fade' | 'slide',

    minHeight?: number,
    /**
     * The border radius of the bottom sheet.
     * May be replaced by the `borderRadius` property of the `style` or tailwind's `rounded-...` property in the `className`
     */
    borderRadius?: string | number,
    /**
     * The content background of the bottom sheet.
     * May be replaced by the `backgroundColor` property of the `style` or tailwind's `bg-color-...` property in the `className`
     */
    contentBackground?: string,
    /**
     * Whether the bottom sheet can be dismissed by gestures
     */
    dismissable?: boolean,

    /**
     * The max offset at which the bottom sheet can be displaced from it's position
     */
    overDragOffset?: number,

    /**
     * Whether a drag handle should be shown
     */
    showDrag?:boolean,
    /**
     * A function that's invoked when the bottom sheet is closed
    */

    onClosed?: (result?: T) =>void
}

/**
 * An aesthetic Bottom sheet Component
 * @param props The props that would be passed in
 * @param ref The Bottom Sheet Reference object that can be used to imperatively control the bottom sheet
 * @author Teninlanimi Taiwo
 * @returns `React.JSX.Element`
 */
function BottomSheet<T>(props: BottomSheetProps<T>, ref: Ref<BottomSheetRefType<T>>) {
    const {children, style, onClosed=()=>{}, overDragOffset = 20, minHeight=220, navigationAnim='slide', borderRadius=40, bounceOffset: bouneOffset=15, className, contentBackground, dismissable=true, showDrag=true} = props;

    const offset = useSharedValue(0);
    const [open, setOpen] = useState(false);
    const enteringAnim = navigationAnim == 'slide'? SlideInDown: FadeIn;

    // const exitAnim = navigationAnim == 'slide'? SlideInDown: FadeOut;

    const closeBottomSheet = (result?: T)=>{
        setOpen(false);
        offset.value = 0;
        onClosed(result);
    }

    const pan =  Gesture.Pan()
        .onChange((event)=>{
            const offsetDelta = offset.value + event.changeY;
            const clamp = Math.max(-overDragOffset, offsetDelta);
            offset.value = offsetDelta > 0? offsetDelta: withSpring(clamp);
        })
        .onFinalize(()=>{
            if(offset.value < minHeight/3 || !dismissable){
                offset.value = withSpring(0);
                return;
            }
            offset.value = withTiming(minHeight, {}, ()=>{
                runOnJS(closeBottomSheet)();
            })
        })

    const translateY = useAnimatedStyle(()=>({
        transform: [{translateY: offset.value}]
    }))

    useImperativeHandle(ref, ()=>({
        close: (result)=>{
            closeBottomSheet(result);

        },
        toggle: ()=>{
            if(open){
                onClosed()
            }
            setOpen(!open)
        },
        open: ()=>{
            setOpen(true);
        },
    }), [])


  return (
   <>
    {open && (
        <>
            <AnimatedPressable onPress={()=>{
                if(dismissable){
                    closeBottomSheet()
                }
            }} entering={FadeIn} exiting={FadeOut} style={constStyles.backdrop} />
            <GestureDetector gesture={pan} >
                <Animated.View entering={enteringAnim.springify().damping(bouneOffset)} className='px-8 py-6 w-full flex gap-4 bg-tertiary absolute rounded-t-[20px] z-10' style={[
                        {backgroundColor: contentBackground ?? Colors.background, bottom: -overDragOffset * 1.1,  minHeight, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius},
                        style,
                        translateY
                    ]}>
                        {showDrag && <View className='w-[15%] h-1.5 rounded-[20px] bg-secondary opacity-45 self-center' />}
                        {children}
                </Animated.View>
            </GestureDetector>
        </>
    )}
   </>
  )
}

const constStyles = StyleSheet.create({
    backdrop:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        zIndex: 1
    }
})

const WrappedBottomSheet = forwardRef(BottomSheet)
export {WrappedBottomSheet as BottomSheet}