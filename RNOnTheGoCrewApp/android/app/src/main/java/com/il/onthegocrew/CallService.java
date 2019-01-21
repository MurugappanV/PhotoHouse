package com.il.onthegocrew;

import android.annotation.TargetApi;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.telecom.Connection;
import android.telecom.ConnectionRequest;
import android.telecom.ConnectionService;
import android.telecom.PhoneAccountHandle;
import android.telecom.TelecomManager;

/**
 * Created by Murugappan V on 1/21/2019.
 */

@TargetApi(Build.VERSION_CODES.N_MR1)
@RequiresApi(api = Build.VERSION_CODES.M)
public class CallService extends ConnectionService{

    public abstract static class Listener {
        public void onCreateIncomingConnectionFailed(ConnectionRequest request) {};
        public void onCreateOutgoingConnectionFailed(ConnectionRequest request) {};
        public void onConnectionListChanged() {};
        public void onConnectionServiceFocusLost() {};
        public void onConnectionServiceFocusGained() {};
    }

    private Listener mListener;
    private CallConnection mConnection = null;
//    private final SelfManagedCallList mCallList = SelfManagedCallList.getInstance();
    @Override
    public Connection onCreateOutgoingConnection(
            PhoneAccountHandle connectionManagerAccount,
            final ConnectionRequest request) {
        return createSelfManagedConnection(request, false);
    }
    @Override
    public Connection onCreateIncomingConnection(PhoneAccountHandle connectionManagerPhoneAccount,
                                                 ConnectionRequest request) {
        return createSelfManagedConnection(request, true);
    }
    @Override
    public void onCreateIncomingConnectionFailed(PhoneAccountHandle connectionManagerPhoneAccount,ConnectionRequest request) {
//        mCallList.notifyCreateIncomingConnectionFailed(request);
    }
    @Override
    public void onCreateOutgoingConnectionFailed(PhoneAccountHandle connectionManagerPhoneAccount,ConnectionRequest request) {
//        mCallList.notifyCreateOutgoingConnectionFailed(request);
    }
    private Connection createSelfManagedConnection(ConnectionRequest request, boolean isIncoming) {
        CallConnection connection = new CallConnection(getApplicationContext(), isIncoming);
        connection.setListener(mConnectionListener);
        connection.setConnectionProperties(Connection.PROPERTY_SELF_MANAGED);
        connection.setConnectionCapabilities(Connection.CAPABILITY_SUPPORT_HOLD);
        connection.setAddress(request.getAddress(), TelecomManager.PRESENTATION_ALLOWED);
        connection.setCallerDisplayName("McDonalds", TelecomManager.PRESENTATION_ALLOWED);
        connection.setVideoState(request.getVideoState());
        connection.setExtras(request.getExtras());
        if (isIncoming) {
//            connection.setIsIncomingCallUiShowing(request.shouldShowIncomingCallUi());
        }
        // Track the phone account handle which created this connection so we can distinguish them
        // in the sample call list later.
        Bundle moreExtras = new Bundle();
        moreExtras.putParcelable(CallConnection.EXTRA_PHONE_ACCOUNT_HANDLE,
                request.getAccountHandle());
        connection.putExtras(moreExtras);
        connection.setVideoState(request.getVideoState());
//        Log.i(this, "createSelfManagedConnection %s", connection);
        mConnection = connection;
        return connection;
    }




    private CallConnection.Listener mConnectionListener =
            new CallConnection.Listener() {
                @Override
                public void onConnectionStateChanged(CallConnection connection) {
                    notifyCallModified();
                }

                @Override
                public void onConnectionRemoved(CallConnection connection) {
                    removeConnection(connection);
                    notifyCallModified();
                }
            };

    public void setListener(Listener listener) {
        mListener = listener;
    }

    public void notifyCallModified() {
        if (mListener != null) {
            mListener.onConnectionListChanged();
        }
    }

    public void removeConnection(CallConnection connection) {
        mConnection = null;
        if (mListener != null) {
            mListener.onConnectionListChanged();
        }
    }
}
