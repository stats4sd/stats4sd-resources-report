# MySQL Data Structures - Notes
The data dump provided includes the tables from the main Stats4SD website database relevant to the resources repository. The structure of these tables are described here.

## Troves
A "trove" is a single resource. (named as the name 'resources' conflicted with, well, lots of things...)

Key fields:

- public: (boolean) should the trove be available on the public site?
- created_at: (timestamp) the date/time the trove was added to the database.
- reviewed: (boolean) has the resource ever been reviewed? 

A trove must have public==1 && reviewed==1 to appear on the front-end.


## Reviews
A trove must be reviewed before it is made available on the public site. This table tracks individual reviews created for troves.

We can use the "completed_at" field to determine when a trove appeared on the front-end by finding the earliest entry for each trove.


Key fields:

- trove_id: (int) the id of the trove being reviewed.
- completed_at: (timestamp) the date/time the review was completed. 


## Collections
A collection is a group of troves. A trove can be in many collections. This link is handled via the `_link_collections_troves` table.

Key fields:

- public: (boolean) should the collection be presented on the public site (https://stats4sd.org/collections)
- created_at: (timestamp) the date/time the collection was added to the database.

At present, collections are not reviewed - so when made public they automatically appear. We don't have timestamps of when they were made public, so as a fallback we can use the `created_at` for summaries.

# Google Analytics
The analytics data dump includes page-hits by country since Jan 05. This is dummy data created to match the format used when downloading page-hits data from Google Analytics. Ideally, the final reporting page will link directly to Google Analytics via API, but this dump can be used as a starting point. 