import * as React from 'react';
import { AddPerson } from '../../panel/components/add-person';
import { AddTag } from '../../panel/components/add-tag';
import { EditRelation } from '../../panel/components/edit-relation';
import '../scss/root.scss';
import '../scss/base.scss';
import { Person } from '../../../../../backend/src/entities/person';
import { Tag } from '../../../../../backend/src/entities/tag';
import { addPerson, addTag, editTag } from '../util/store-manager';
import * as config from '../../../config.json';
import { Lists } from '../../list/components/lists';
import { Search } from '../../panel/components/search';
import { NetworkChart } from '../../chart/components/network';
import { Info } from '../../panel/components/info';
import { EditTag } from '../../panel/components/edit-tag';

export interface Store {
  people: Array<Person>;
  tags: Array<Tag>;
}

export const Root: React.FC<Record<string, unknown>> = (): JSX.Element => {
  const [tags, setTags] = React.useState<Array<Tag>>([]);
  const [people, setPeople] = React.useState<Array<Person>>([]);

  function fetchData(): void {
    fetch(`${config.API_HOST}/person`)
      .then(response => response.json())
      .then(people => {
        setPeople(people);
      });
    fetch(`${config.API_HOST}/tag`)
      .then(response => response.json())
      .then(tags => {
        setTags(tags);
      });
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="root">
      <section style={{ marginRight: '1rem' }}>
        <AddPerson store={people} addPerson={addPerson(setPeople)} />
        <section className="tag-space">
          <AddTag store={tags} addTag={addTag(setTags)} />
          <EditTag tags={tags} editTags={editTag(setTags)} />
        </section>
        <EditRelation people={people} tags={tags} refresh={() => fetchData()} />
        <Lists people={people} tags={tags} />
        <Info />
      </section>
      <section>
        <NetworkChart people={people} />
        <Search people={people} />
      </section>
    </section>
  );
};
