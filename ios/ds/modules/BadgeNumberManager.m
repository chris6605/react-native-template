//
//  BadgeNumberManager.m
//  ds
//
//  Created by Chris Zhou on 2020/5/14.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "BadgeNumberManager.h"


@implementation BadgeNumberManager
RCT_EXPORT_MODULE()

// 设置 app icon的角标
RCT_EXPORT_METHOD(setBadgeNumber:(int) number ){
  NSLog(@"num = %d",number);
 
  dispatch_async(dispatch_get_main_queue(), ^{
     [[UIApplication sharedApplication] setApplicationIconBadgeNumber:number];
  });
 
 
}

@end
