import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};




export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

/** A `Lift` is a chairlift, gondola, tram, funicular, pulley, rope tow, or other means of ascending a mountain. */
export type Lift = {
  __typename?: 'Lift';
  /** The unique identifier for a `Lift` (id: "panorama") */
  id: Scalars['ID'];
  /** The name of a `Lift` */
  name: Scalars['String'];
  /** The current status for a `Lift`: `OPEN`, `CLOSED`, `HOLD` */
  status?: Maybe<LiftStatus>;
  /** The number of people that a `Lift` can hold */
  capacity: Scalars['Int'];
  /** A boolean describing whether a `Lift` is open for night skiing */
  night: Scalars['Boolean'];
  /** The number of feet in elevation that a `Lift` ascends */
  elevationGain: Scalars['Int'];
  /** A list of trails that this `Lift` serves */
  trailAccess: Array<Trail>;
};

/** An enum describing the options for `LiftStatus`: `OPEN`, `CLOSED`, `HOLD` */
export enum LiftStatus {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Hold = 'HOLD'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Sets a `Lift` status by sending `id` and `status` */
  setLiftStatus: Lift;
  /** Sets a `Trail` status by sending `id` and `status` */
  setTrailStatus: Trail;
};


export type MutationSetLiftStatusArgs = {
  id: Scalars['ID'];
  status: LiftStatus;
};


export type MutationSetTrailStatusArgs = {
  id: Scalars['ID'];
  status: TrailStatus;
};

export type Query = {
  __typename?: 'Query';
  /** A list of all `Lift` objects */
  allLifts: Array<Lift>;
  /** A list of all `Trail` objects */
  allTrails: Array<Trail>;
  /** Returns a `Lift` by `id` (id: "panorama") */
  Lift: Lift;
  /** Returns a `Trail` by `id` (id: "old-witch") */
  Trail: Trail;
  /** Returns an `Int` of `Lift` objects with optional `LiftStatus` filter */
  liftCount: Scalars['Int'];
  /** Returns an `Int` of `Trail` objects with optional `TrailStatus` filter */
  trailCount: Scalars['Int'];
  /** Returns a list of `SearchResult` objects based on `term` or `status` */
  search: Array<SearchResult>;
};


export type QueryAllLiftsArgs = {
  status?: Maybe<LiftStatus>;
};


export type QueryAllTrailsArgs = {
  status?: Maybe<TrailStatus>;
};


export type QueryLiftArgs = {
  id: Scalars['ID'];
};


export type QueryTrailArgs = {
  id: Scalars['ID'];
};


export type QueryLiftCountArgs = {
  status?: Maybe<LiftStatus>;
};


export type QueryTrailCountArgs = {
  status?: Maybe<TrailStatus>;
};


export type QuerySearchArgs = {
  term?: Maybe<Scalars['String']>;
  status?: Maybe<LiftStatus>;
};

/** This union type returns one of two types: a `Lift` or a `Trail`. When we search for a letter, we'll return a list of either `Lift` or `Trail` objects. */
export type SearchResult = Lift | Trail;

export type Subscription = {
  __typename?: 'Subscription';
  /** Listens for changes in lift status */
  liftStatusChange?: Maybe<Lift>;
  /** Listens for changes in trail status */
  trailStatusChange?: Maybe<Trail>;
};

/** A `Trail` is a run at a ski resort */
export type Trail = {
  __typename?: 'Trail';
  /** A unique identifier for a `Trail` (id: 'hemmed-slacks') */
  id: Scalars['ID'];
  /** The name of a `Trail` */
  name: Scalars['String'];
  /** The current status for a `Trail`: OPEN, CLOSED */
  status?: Maybe<TrailStatus>;
  /** The difficulty rating for a `Trail` */
  difficulty: Scalars['String'];
  /** A boolean describing whether or not a `Trail` is groomed */
  groomed: Scalars['Boolean'];
  /** A boolean describing whether or not a `Trail` has trees */
  trees: Scalars['Boolean'];
  /** A boolean describing whether or not a `Trail` is open for night skiing */
  night: Scalars['Boolean'];
  /** A list of Lifts that provide access to this `Trail` */
  accessedByLifts: Array<Lift>;
};

/** An enum describing the options for `TrailStatus`: `OPEN`, `CLOSED` */
export enum TrailStatus {
  Open = 'OPEN',
  Closed = 'CLOSED'
}


export type GetAllLiftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLiftsQuery = (
  { __typename?: 'Query' }
  & { allLifts: Array<(
    { __typename?: 'Lift' }
    & Pick<Lift, 'name' | 'status' | 'capacity' | 'elevationGain'>
    & { trailAccess: Array<(
      { __typename?: 'Trail' }
      & Pick<Trail, 'id' | 'name' | 'difficulty'>
    )> }
  )> }
);

export const GetAllLiftsDocument = gql`
    query getAllLifts {
  allLifts {
    name
    status
    capacity
    elevationGain
    trailAccess {
      id
      name
      difficulty
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllLiftsGQL extends Apollo.Query<GetAllLiftsQuery, GetAllLiftsQueryVariables> {
    document = GetAllLiftsDocument;
    client = 'snowTooth';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }