package com.il.onthegocrew;

import android.content.Context;
import android.media.MediaPlayer;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.telecom.CallAudioState;
import android.telecom.Connection;
import android.telecom.DisconnectCause;
import android.telecom.VideoProfile;

/**
 * Created by Murugappan V on 1/21/2019.
 */

@RequiresApi(api = Build.VERSION_CODES.M)
public class CallConnection extends Connection {
    public static class Listener {
        public void onConnectionStateChanged(CallConnection connection) {}
        public void onConnectionRemoved(CallConnection connection) {}
    }

    private boolean mIsHandover;
    private final MediaPlayer mMediaPlayer;
    private Listener mListener;
    private static int sNextCallId = 1;
    private final int mCallId;
    private final Context mContext;
    private final boolean mIsIncomingCall;
    public static final String EXTRA_PHONE_ACCOUNT_HANDLE = "com.android.server.telecom.testapps.extra.PHONE_ACCOUNT_HANDLE";

    CallConnection(Context context, boolean isIncoming) {
//        mCallList = callList;
        mMediaPlayer = createMediaPlayer(context);
        mIsIncomingCall = isIncoming;
        mContext = context;
        mCallId = sNextCallId++;
    }

    @Override
    public void onShowIncomingCallUi() {
        if (isHandover()) {
            return;
        }
    }


    /**
     * Handles updates to the audio state of the connection.
     * @param state The new connection audio state.
     */
    @Override
    public void onCallAudioStateChanged(CallAudioState state) {
//        mCallList.notifyCallModified();
    }

    @Override
    public void onHold() {
        if (mMediaPlayer != null) {
            mMediaPlayer.pause();
        }
        setOnHold();
    }

    @Override
    public void onUnhold() {
        if (mMediaPlayer != null) {
            mMediaPlayer.start();
        }
        setActive();
    }

    @Override
    public void onAnswer(int videoState) {
        setConnectionActive();
    }

    @Override
    public void onAnswer() {
        onAnswer(VideoProfile.STATE_AUDIO_ONLY);
    }

    @Override
    public void onReject() {
        setConnectionDisconnected(DisconnectCause.REJECTED);
    }

    @Override
    public void onDisconnect() {
        setConnectionDisconnected(DisconnectCause.LOCAL);
    }

    public void setIsHandover(boolean isHandover) {
        mIsHandover = isHandover;
    }

    public boolean isHandover() {
        return mIsHandover;
    }

    public void setListener(Listener listener) {
        mListener = listener;
    }

    public void setConnectionActive() {
        mMediaPlayer.start();
        setActive();
        if (mListener != null ) {
            mListener.onConnectionStateChanged(this);
        }
    }

    public void setConnectionDisconnected(int cause) {
//        NotificationManager notificationManager = mContext.getSystemService(
//                NotificationManager.class);
//        notificationManager.cancel(CALL_NOTIFICATION, mCallId);
        mMediaPlayer.stop();
        setDisconnected(new DisconnectCause(cause));
        destroy();
        if (mListener != null ) {
            mListener.onConnectionRemoved(this);
        }
    }


    private MediaPlayer createMediaPlayer(Context context) {
        int audioToPlay = (Math.random() > 0.5f) ? R.raw.sample_audio : R.raw.sample_audio2;
        MediaPlayer mediaPlayer = MediaPlayer.create(context, audioToPlay);
        mediaPlayer.setLooping(true);
        return mediaPlayer;
    }






































































//    public static class Listener {
//        public void onConnectionStateChanged(CallConnection connection) {}
//        public void onConnectionRemoved(CallConnection connection) {}
//    }
//    public static final String INCOMING_CALL_CHANNEL_ID = "INCOMING_CALL_CHANNEL_ID";
//    public static final String EXTRA_PHONE_ACCOUNT_HANDLE =
//            "com.android.server.telecom.testapps.extra.PHONE_ACCOUNT_HANDLE";
//    public static final String CALL_NOTIFICATION = "com.android.server.telecom.testapps.CALL";

//    private static int sNextCallId = 1;

//    private final int mCallId;
//    private final Context mContext;
//    private final SelfManagedCallList mCallList;
//    private final boolean mIsIncomingCall;
//    private boolean mIsIncomingCallUiShowing;
//    private Listener mListener;
//    private Notification.Builder mNotificationBuilder;

//    CallConnection(SelfManagedCallList callList, Context context, boolean isIncoming) {
//        mCallList = callList;
//        mMediaPlayer = createMediaPlayer(context);
//        mIsIncomingCall = isIncoming;
//        mContext = context;
//        mCallId = sNextCallId++;
//    }









//    @Override
//    public void onSilence() {
//        // Re-post our notification without a ringtone.
//        mNotificationBuilder.setOnlyAlertOnce(true);
//        NotificationManager notificationManager = mContext.getSystemService(
//                NotificationManager.class);
//        notificationManager.notify(CALL_NOTIFICATION, mCallId, mNotificationBuilder.build());
//    }
//
//
//    public void setConnectionHeld() {
//        mMediaPlayer.pause();
//        setOnHold();
//        if (mListener != null ) {
//            mListener.onConnectionStateChanged(this);
//        }
//    }



//    public void setIsIncomingCallUiShowing(boolean showing) {
//        mIsIncomingCallUiShowing = showing;
//    }
//
//    public boolean isIncomingCallUiShowing() {
//        return mIsIncomingCallUiShowing;
//    }
//
//    public boolean isIncomingCall() {
//        return mIsIncomingCall;
//    }
//
//    public int getCallId() {
//        return mCallId;
//    }



//    public boolean isHoldable() {
//        return (getConnectionCapabilities() & Connection.CAPABILITY_HOLD) != 0;
//    }

}
