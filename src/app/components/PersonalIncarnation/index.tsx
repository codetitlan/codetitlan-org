import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPiState, selectIncarnationId } from './slice/selectors';
import { usePersonalIncarnationSlice } from './slice';
import styled from 'styled-components/macro';

interface Props {}

const Span = styled.span``;

export const PersonalIncarnation = (props: Props) => {
  const { actions } = usePersonalIncarnationSlice();
  const piState = useSelector(selectPiState);
  const incarnationId = useSelector(selectIncarnationId);
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    if (piState && piState === 'empty') {
      dispatch(actions.loadIncarnation('xolozcuintle'));
    }
  });

  return (
    <>
      <Span>
        {piState === 'loaded'
          ? `Incarnation id is: ${incarnationId}`
          : piState === 'loading'
          ? 'Loading Incarnation'
          : 'No Incarnation Available'}
      </Span>
    </>
  );
};
