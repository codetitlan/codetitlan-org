import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Typewriter from 'typewriter-effect';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentDialog, selectDefaultText } from './slice/selectors';
import { usePersonalIncarnationSlice } from './slice';

// import { FormLabel } from 'app/components/FormLabel';
// import { Input } from './components/Input';
// import { RepoItem } from './RepoItem';
// import { TextButton } from './components/TextButton';
// ... selectors ...
// import { LoadingIndicator } from 'app/components/LoadingIndicator';
// import { RepoErrorType } from './slice/types';
// import { useGithubRepoFormSlice } from './slice';

const twOptions = {
  strings: [
    'The answer to life the universe and everything ...',
    '...was never 42!',
  ],
  autoStart: true,
  loop: true,
};
const twOnInit = tw => tw.pauseFor(5000).start();

export function PersonalIncarnation() {
  const { actions } = usePersonalIncarnationSlice();
  const { currentDialog, currentDialogset } = useSelector(selectCurrentDialog);
  const defaultText = useSelector(selectDefaultText);
  const dispatch = useDispatch();

  const onDoStuff = (evt: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(actions.moveAhead('Errrr HEllo !!'));
  };
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    if (defaultText && defaultText.trim().length > 0) {
      dispatch(actions.moveAhead('xolozcuintle'));
    }
  });

  return (
    <>
      <Typewriter options={twOptions} onInit={twOnInit} />
      <Wrapper>
        <button
          onClick={onDoStuff}
        >{`CD: ${currentDialog} CDS: ${currentDialogset}`}</button>
      </Wrapper>
    </>
  );
}

// export function GithubRepoForm() {
//   const { actions } = useGithubRepoFormSlice();

//   const username = useSelector(selectUsername);
//   const repos = useSelector(selectRepos);
//   const isLoading = useSelector(selectLoading);
//   const error = useSelector(selectError);

//   const dispatch = useDispatch();

//   const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(actions.changeUsername(evt.currentTarget.value));
//     dispatch(actions.loadRepos());
//   };

//   const useEffectOnMount = (effect: React.EffectCallback) => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     useEffect(effect, []);
//   };

//   useEffectOnMount(() => {
//     // When initial state username is not null, submit the form to load repos
//     if (username && username.trim().length > 0) {
//       dispatch(actions.loadRepos());
//     }
//   });

//   const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
//     /* istanbul ignore next  */
//     if (evt !== undefined && evt.preventDefault) {
//       evt.preventDefault();
//     }
//   };

//   return (
//     <Wrapper>
//       {/* <FormGroup onSubmit={onSubmitForm}>
//         <FormLabel>Github Username</FormLabel>
//         <InputWrapper>
//           <Input
//             type="text"
//             placeholder="Type any Github username"
//             value={username}
//             onChange={onChangeUsername}
//           />
//           {isLoading && <LoadingIndicator small />}
//         </InputWrapper>
//       </FormGroup>
//       {repos?.length > 0 ? (
//         <List>
//           {repos.map(repo => (
//             <RepoItem
//               key={repo.id}
//               name={repo.name}
//               starCount={repo.stargazers_count}
//               url={repo.html_url}
//             />
//           ))}
//         </List>
//       ) : error ? (
//         <ErrorText>{repoErrorText(error)}</ErrorText>
//       ) : null} */}
//     </Wrapper>
//   );
// }

// export const repoErrorText = (error: RepoErrorType) => {
//   switch (error) {
//     case RepoErrorType.USER_NOT_FOUND:
//       return 'There is no such user 😞';
//     case RepoErrorType.USERNAME_EMPTY:
//       return 'Type any Github username';
//     case RepoErrorType.USER_HAS_NO_REPO:
//       return 'User has no repository 🥺';
//     case RepoErrorType.GITHUB_RATE_LIMIT:
//       return 'Looks like github api`s rate limit(60 request/h) has exceeded 🤔';
//     default:
//       return 'An error has occurred!';
//   }
// };
export const TextButton = styled.button`
  background: none;
  outline: none;
  padding: 0;
  margin: 0;
  border: none;
  color: ${p => p.theme.primary};
  cursor: progress;
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  &:active {
    opacity: 0.4;
  }
`;

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;

//   ${Input} {
//     width: ${100 / 3}%;
//     margin-right: 0.5rem;
//   }
// `;

// const ErrorText = styled.span`
//   color: ${p => p.theme.text};
// `;

// const FormGroup = styled.form`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 1rem;

//   ${FormLabel} {
//     margin-bottom: 0.25rem;
//     margin-left: 0.125rem;
//   }
// `;

// const List = styled.div``;
