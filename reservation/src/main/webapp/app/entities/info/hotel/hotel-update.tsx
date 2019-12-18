import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './hotel.reducer';
import { IHotel } from 'app/shared/model/info/hotel.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHotelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHotelUpdateState {
  isNew: boolean;
}

export class HotelUpdate extends React.Component<IHotelUpdateProps, IHotelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { hotelEntity } = this.props;
      const entity = {
        ...hotelEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/hotel');
  };

  render() {
    const { hotelEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="reservationApp.infoHotel.home.createOrEditLabel">
              <Translate contentKey="reservationApp.infoHotel.home.createOrEditLabel">Create or edit a Hotel</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : hotelEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="hotel-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="hotel-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="hotel-name">
                    <Translate contentKey="reservationApp.infoHotel.name">Name</Translate>
                  </Label>
                  <AvField
                    id="hotel-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="nameLabel">
                    <Translate contentKey="reservationApp.infoHotel.help.name" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="hotel-address">
                    <Translate contentKey="reservationApp.infoHotel.address">Address</Translate>
                  </Label>
                  <AvField
                    id="hotel-address"
                    type="text"
                    name="address"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="addressLabel">
                    <Translate contentKey="reservationApp.infoHotel.help.address" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="postCodeLabel" for="hotel-postCode">
                    <Translate contentKey="reservationApp.infoHotel.postCode">Post Code</Translate>
                  </Label>
                  <AvField id="hotel-postCode" type="text" name="postCode" />
                  <UncontrolledTooltip target="postCodeLabel">
                    <Translate contentKey="reservationApp.infoHotel.help.postCode" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="hotel-city">
                    <Translate contentKey="reservationApp.infoHotel.city">City</Translate>
                  </Label>
                  <AvField
                    id="hotel-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="cityLabel">
                    <Translate contentKey="reservationApp.infoHotel.help.city" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="hotel-url">
                    <Translate contentKey="reservationApp.infoHotel.url">Url</Translate>
                  </Label>
                  <AvField id="hotel-url" type="text" name="url" />
                  <UncontrolledTooltip target="urlLabel">
                    <Translate contentKey="reservationApp.infoHotel.help.url" />
                  </UncontrolledTooltip>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/hotel" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  hotelEntity: storeState.hotel.entity,
  loading: storeState.hotel.loading,
  updating: storeState.hotel.updating,
  updateSuccess: storeState.hotel.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelUpdate);
