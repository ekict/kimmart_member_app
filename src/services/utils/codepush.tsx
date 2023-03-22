import CodePush, {DownloadProgress} from 'react-native-code-push';
import React, {createContext, useContext} from 'react';

//** Deploy = appcenter codepush release-react -a ekictec-gmail.com/kimmart-member-android -d Staging */
const CODE_PUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

interface CodePushContext {
  status: null | CodePush.SyncStatus;
  progress: null | number;
  receivedBytes: null | number;
  totalBytes: null | number;
}

// @ts-ignore
const CodePushContext = createContext<CodePushContext>({});

export const useCodePush = () => useContext<CodePushContext>(CodePushContext);

export const CodePushProvider = (WrappedComponent: any) => {
  class WrappedApp extends React.Component {
    state = {
      status: null,
      progress: null,
      receivedBytes: null,
      totalBytes: null,
    };

    codePushStatusDidChange(status: CodePush.SyncStatus) {
      this.setState({status});
    }

    codePushDownloadDidProgress(progress: DownloadProgress) {
      this.setState({
        progress: progress.receivedBytes / progress.totalBytes,
        receivedBytes: progress.receivedBytes,
        totalBytes: progress.totalBytes,
      });
    }

    render() {
      return (
        <CodePushContext.Provider
          value={{
            status: this.state.status,
            progress: this.state.progress,
            receivedBytes: this.state.receivedBytes,
            totalBytes: this.state.totalBytes,
          }}>
          <WrappedComponent />
        </CodePushContext.Provider>
      );
    }
  }

  return CodePush(CODE_PUSH_OPTIONS)(WrappedApp);
};

export default CodePushProvider;
